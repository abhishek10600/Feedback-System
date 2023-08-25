"use client"

import { useEffect, useState } from "react";
import FeedbackItem from "./components/FeedbackItem";
import FeedbackFormPopup from "./components/FeedbackFormPopup";
import Button from "./components/Button";
import FeedbackItemPopup from "./components/FeedbackItemPopup";
import axios from "axios";

export default function Home() {
  const [showFeedbackPopupForm, setShowFeedbackPopupForm] = useState(false);
  const [showFeedbackPopupItem, setShowFeedbackPopupItem] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedbackData = async () => {
    const res = await axios.get('/api/feedback');
    setFeedbacks(res.data);

  }
  useEffect(() => {
    getFeedbackData();
  }, [])



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
            <FeedbackItem key={feedback.id} {...feedback} onOpen={() => openFeedbackPopupItem(feedback)} />
          ))
        }
        {showFeedbackPopupForm && (
          <FeedbackFormPopup setShow={setShowFeedbackPopupForm} />
        )}
        {
          showFeedbackPopupItem && (
            <FeedbackItemPopup {...showFeedbackPopupItem} setShow={setShowFeedbackPopupItem} />
          )
        }
      </div>
    </main>
  )
}
