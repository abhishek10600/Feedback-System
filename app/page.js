"use client"

import { useEffect, useState } from "react";
import FeedbackItem from "./components/FeedbackItem";
import FeedbackFormPopup from "./components/FeedbackFormPopup";
import Button from "./components/Button";
import FeedbackItemPopup from "./components/FeedbackItemPopup";
import axios from "axios";
import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";

export default function Home() {
  const { data: session } = useSession();
  const [showFeedbackPopupForm, setShowFeedbackPopupForm] = useState(false);
  const [showFeedbackPopupItem, setShowFeedbackPopupItem] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [votes, setVotes] = useState([]);

  //function to get the feedbacks
  const getFeedbackData = async () => {
    const res = await axios.get('/api/feedback');
    setFeedbacks(res.data);

  }

  //calling the function getFeedbackData() that gets the data when the page loads
  useEffect(() => {
    getFeedbackData();
  }, [])

  const fetchVotes = async () => {
    const ids = feedbacks.map(feedback => feedback._id);
    const res = await axios.get("/api/vote/?feedbackIds=" + ids.join(","))
    setVotes(res.data);
  }

  //calling the function getFeedbackVotes() when the page loads.
  useEffect(() => {
    fetchVotes();
  }, [feedbacks]);

  //allowing users to cast vote if they are logged in or else ask them to login first
  useEffect(() => {
    if (session?.user?.email) {
      const feedbackId = localStorage.getItem("vote_after_login");
      if (feedbackId) {
        (async () => {
          await axios.post("/api/vote", { feedbackId })
        })
        axios.post("/api/vote", { feedbackId }).then(() => {
          //removing item from local storage
          localStorage.removeItem("vote_after_login");
          fetchVotes();
        })
      }
    }
  }, [session?.user?.email])

  const openFeedbackPopupForm = () => {
    setShowFeedbackPopupForm(true);
  }
  const openFeedbackPopupItem = (feedback) => {
    setShowFeedbackPopupItem(feedback);
  }
  return (
    <main className="bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded-lg md:mt-8 overflow-hidden">
      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-8">
        <h1 className="font-bold text-xl">Feedback System</h1>
        <p className="text-opacity-90 text-slate-700">Help me decide what I should build next or help me improve!</p>
      </div>
      <div className="bg-gray-100 px-8 py-4 text-right flex border-b">
        <div className="grow"></div>
        <div>
          <Button primary onClick={openFeedbackPopupForm}>Make a suggestion</Button>
        </div>
      </div>
      <div className="px-8">
        {
          feedbacks.map(feedback => (
            <FeedbackItem
              key={feedback.id}
              {...feedback}
              onVotesChange={fetchVotes}
              votes={votes?.filter(v => v.feedbackId.toString() === feedback._id.toString())}
              onOpen={() => openFeedbackPopupItem(feedback)}
            />
          ))
        }
        {showFeedbackPopupForm && (
          <FeedbackFormPopup
            setShow={setShowFeedbackPopupForm}
            onCreate={getFeedbackData}
          />
        )}
        {
          showFeedbackPopupItem && (
            <FeedbackItemPopup
              {...showFeedbackPopupItem}
              onVotesChange={fetchVotes}
              votes={votes.filter(v => v.feedbackId.toString() === showFeedbackPopupItem._id)}
              setShow={setShowFeedbackPopupItem}
            />
          )
        }
      </div>
    </main>

  )
}
