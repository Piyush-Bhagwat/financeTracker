import React, { useState } from "react";
import { useGlobalContext } from "../context/Context";
import "../assets/style/profile.css";
import { IoIosAdd } from "react-icons/io";

import EmojiPicker from "emoji-picker-react";
import { addCategory } from "../database/user.db";

const Profile = () => {
    const { categories, user } = useGlobalContext();

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [emoji, setEmoji] = useState("😵‍💫");
    const [color, setColor] = useState("#34ac5d");

    const [emojiVisible, setEmojiVisible] = useState(false);

    const handleEmojiChange = (e) => {
        setEmoji(e.emoji);
    };

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

    const handleSubmit = async () => {
        const data = {
            name,
            emoji,
            color,
        };
        await addCategory(user.uid, data);

        setName("");
        setEmoji("😵‍💫");
        setColor("#34ac5d");
        setShowForm(false);
    };

    return (
        <div className="profile-page">
            <h2>Your Profile</h2>
            <h3>All Categories</h3>
            <div className="categories">
                {renderCategories()}

                {categories?.length < 20 && (
                    <button
                        className="category"
                        onClick={() => setShowForm(true)}
                    >
                        <span className="emoji">
                            <IoIosAdd />
                        </span>
                        Add
                    </button>
                )}
            </div>

            <h3>Logout</h3>
            <button className="logout-btn">Logout</button>

            {showForm && (
                <div className="add-category-container">
                    <h2>Add a Category</h2>
                    <div className="add-category-form">
                        <button
                            className="close-btn"
                            onClick={() => setShowForm(false)}
                        >
                            X
                        </button>

                        <label>name: </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="cat-name"
                        />
                        <label>Emoji: </label>
                        <div className="emoji-picker">
                            <button
                                className="emoji-btn"
                                onClick={() => setEmojiVisible((p) => !p)}
                            >
                                {emoji}
                            </button>

                            {emojiVisible && (
                                <EmojiPicker
                                    theme="dark"
                                    width="100%"
                                    onEmojiClick={handleEmojiChange}
                                />
                            )}
                        </div>
                        <label>Color: </label>
                        <select
                            onChange={(e) => setColor(e.target.value)}
                            name="color"
                            className="cat-color"
                        >
                            <option
                                value="#34ac5d"
                                style={{ backgroundColor: "#34ac5d" }}
                            >
                                blue
                            </option>
                            <option
                                value="#706943"
                                style={{ backgroundColor: "#706943" }}
                            >
                                brown
                            </option>
                            <option
                                value="#288239"
                                style={{ backgroundColor: "#288239" }}
                            >
                                Green
                            </option>
                            <option
                                value="#444E86"
                                style={{ backgroundColor: "#444E86" }}
                            >
                                dark blue
                            </option>
                            <option
                                value="#DBB025"
                                style={{ backgroundColor: "#DBB025" }}
                            >
                                yellow
                            </option>
                            <option
                                value="#25DB8F"
                                style={{ backgroundColor: "#25DB8F" }}
                            >
                                Cayan
                            </option>
                        </select>

                        <button onClick={handleSubmit}> Add </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
