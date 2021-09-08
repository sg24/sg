import * as Localization from 'expo-localization';

import translate from './translate';

const translator = (sentence, keyword, positionRight, core, fullLocale) => {
    return translate(Localization.locale, sentence, keyword, positionRight, fullLocale, core)
}


export default translator;

// Network Error
// Connection Error
// SignIn
// SignUp
// ForgetPassword
// ResetPassword
// HomeWeb
// Favorite
// UsersWeb
// Question
// Feed
// WriteUp
// CommentBox
// ChatBox
// QuestionSolution
// MediaPreview
// PagePreview
// SharePicker
// SelectPicker
// CBTWeb
// GroupWeb
// GroupPreview
// ExamInstruction
// Exam
// MarkExam
// GeneralSettings
// RoomInfo
// Logout
// Search
// Addnew
// Conversation
// Notification
// Profile
// AddPost
// AddQuestion
// AddAdvert
// AddFeed
// AddWriteUp
// AddCBT
// AddGroup
// AddGroupPost
// AddGroupQuestion
// AddGroupFeed
// AddGroupWriteUp
// AddGroupCBT
// AddChatRoom
// AddReport
// AddAppError
// EditPost
// EditQuestion
// EditFeed
// EditWriteUp
// EditGroup
// EditGroupPost
// EditGroupQuestion
// EditGroupFeed
// EditGroupWriteUp
// EditGroupCBT
// EditChatRoom
// EditCBT
// EditAdvert
// HashSearch
// NotificationPage
// Title
// Description
// Content
// Description must not be empty
// Content must not be empty
// enable comment
// Take Picture
// Video Record 
// Audio Record 
// File Explorer
// add
// comment
// choose
// Video Recorder
// Audio Recorder
// Camera
// Emoji Selector
// view
// Create Advert Button
// Feed submitted successfully
// Advert submitted successfully
// Group created successfully
// Report submitted successfully
// Write Up submitted successfully
// Question submitted successfully
// Post submitted successfully
// CBT submitted successfully 
// Chat Room created successfully
// Name
// Name must not be empty
// Add Purpose / Rules
// Purpose / Rules
// Ask Question
// Exam Duration
// Hour
// minute
// Second
// Accept user at pass mark
// Pass mark in percent(%)
// Pass Mark
// %
// Add Chat Room
// next
// created
// Select Type
// Duration must not be zero
// Number must not be greater than 
// Add CBT
// Exam Summary / Instruction
// Exam Summary / Instruction must not be empty
// Select Participant
// Enable Chat Deletion
// Add Participant Result To Chat
// Write ....
// Add Feed
// Add Post
// Add Question
// Ask Question ....
// ask
// Publish
// Add Write Up
// Add Advert
// App Error Report submitted successfully
// Report
// App Error Report