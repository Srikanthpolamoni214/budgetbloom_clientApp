import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';

import "./reviewCard.css";
import { baseURL } from '../../App';


const ReviewCard = ({ review }) => {
  const { name, rating, comment, photo, created_at } = review;

  return (
    <div className="review-card">
      <div className="review-avatar">
        {photo ? (
          <img
            src={`${baseURL}/uploads/${photo? photo : '/default_profile_photo.avif'}`}
            alt={name}
            className="avatar-img"
          />
        ) : (
          <FaUserCircle className="avatar-icon" />
        )}
                  <h4 className="review-name">{name}</h4>

      </div>

      <div className="review-content">
        <div className="review-header">
          <p className="review-date">{moment(created_at).fromNow()}</p>
        </div>

        <div className="review-stars">
          {[...Array(Number(rating))].map((_, i) => (
            <FaStar key={i} className="star-filled" />
          ))}
        </div>

        <p className="verified-badge">✔ Verified Customer</p>
        <p className="review-comment">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
