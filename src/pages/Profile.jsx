import React from "react";
import { useGlobalContext } from "../context/Context";
import "../assets/style/profile.css";
import { IoIosAdd } from "react-icons/io";

const Profile = () => {
    const { categories } = useGlobalContext();

    const renderCategories = () => {
        return (
            <>
                {categories?.map((cat) => {
                    return (
                        <div className="category">
                            <span
                                className="emoji"
                                style={{ backgroundColor: cat.color }}
                            >
                                {cat.emoji}
                            </span>
                            {cat.name}
                        </div>
                    );
                })}
            </>
        );
    };

    return (
        <div className="profile-page">
            <h2>Your Profile</h2>

            <h3>All Categories</h3>
            <div className="categories">
                {renderCategories()}
                <button className="category">
                    <span className="emoji">
                        <IoIosAdd />
                    </span>
                    Add
                </button>
            </div>

            <h3>Logout</h3>
            <button className="logout-btn">Logout</button>
        </div>
    );
};

export default Profile;
