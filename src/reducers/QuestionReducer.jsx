"use strict";

import {
    QUESTION_IS_LOADING,
    QUESTION_HAS_ERRORED,
    QUESTION_REQUEST_SUCCESS,
    QUESTION_UPDATE_SECTION,
    QUESTION_UPDATE_L1,
    QUESTION_UPDATE_L2,
    QUESTION_UPDATE_L3,
    QUESTION_UPDATE_L4,
    QUESTION_UPDATE_SOURCE,
    QUESTION_UPDATE_QUESTION_TYPE,
    QUESTION_UPDATE_DIFFICULTY,
    QUESTION_UPDATE_STATUS,
    QUESTION_UPDATE_PARSED_QUESTION,
    INIT_QUESTIONS,
    QUESTION_UPDATE_ID,
    QUESTION_UPDATE_QUESTION,
    QUESTION_RESET_STATE,
    QUESTION_UPDATE_OPTION,
    QUESTION_ADD_OPTION,
    QUESTION_REMOVE_OPTION
} from "./../actions/ActionConstants";

const defaultOption = {
    raw: "",
    parsed: null
};

let defaultState = {
    isLoading: false,
    hasErrored: false,
    errorMessage: "",
    requestSuccess: false,
    sectionId: "",
    l1Id: "",
    l2Id: "",
    l3Id: "",
    l4Id: "",
    sources: [""],
    questionType: "single",
    difficulty: 50,
    status: "draft",
    question: "",
    parsedQuestion: "",
    questions: [],
    options: [defaultOption]
};

export function QuestionReducer(state = defaultState, action) {
    switch (action.type) {
        case QUESTION_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case QUESTION_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored
            };
        case QUESTION_REQUEST_SUCCESS:
            return {
                ...state,
                requestSuccess: action.requestSuccess
            };
        case QUESTION_UPDATE_SECTION:
            return {
                ...state,
                sectionId: action.sectionId
            };
        case QUESTION_UPDATE_L1:
            return {
                ...state,
                l1Id: action.l1Id
            };
        case QUESTION_UPDATE_L2:
            return {
                ...state,
                l2Id: action.l2Id
            };
        case QUESTION_UPDATE_L3:
            return {
                ...state,
                l3Id: action.l3Id
            };
        case QUESTION_UPDATE_L4:
            return {
                ...state,
                l4Id: action.l4Id
            };
        case QUESTION_UPDATE_SOURCE:
            return {
                ...state,
                sources: [action.sourceId]
            };
        case QUESTION_UPDATE_QUESTION_TYPE:
            return {
                ...state,
                questionType: action.questionType
            };
        case QUESTION_UPDATE_DIFFICULTY:
            return {
                ...state,
                difficulty: action.difficulty
            };
        case QUESTION_UPDATE_STATUS:
            return {
                ...state,
                staus: action.status
            };
        case QUESTION_UPDATE_PARSED_QUESTION:
            return {
                ...state,
                parsedQuestion: action.parsedQuestion
            };
        case INIT_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            };
        case QUESTION_UPDATE_ID:
            return {
                ...state,
                id: action.id
            };
        case QUESTION_UPDATE_QUESTION:
            return {
                ...state,
                question: action.question
            };
        case QUESTION_RESET_STATE:
            return defaultState;
        case QUESTION_ADD_OPTION:
            return {
                ...state,
                options: [
                    ...state.options,
                    defaultOption
                ]
            };
        case QUESTION_UPDATE_OPTION: {
            return {
                ...state,
                options: [
                    ...state.options.slice(0, action.index),
                    action.option,
                    ...state.options.slice(action.index + 1)
                ]
            };
        }
        case QUESTION_REMOVE_OPTION: {
            return {
                ...state,
                options: [
                    ...state.options.slice(0, action.index),
                    ...state.options.slice(action.index + 1)
                ]
            };
        }
        default:
            return state;
    }
}

