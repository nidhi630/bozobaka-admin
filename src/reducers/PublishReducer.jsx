
import {
    PUBLISH_INIT_QUESTIONS,
    PUBLISH_INIT_THEORIES,
    PUBLISH_TYPE,
    PUBLISH_IS_LOADING,
    PUBLISH_HAS_ERRORED,
    PUBLISH_SORT_DIALOG
} from "./../actions/ActionConstants";

const defaultState = {
    questions: [],
    theories: [],
    isLoading: false,
    hasErrored: false,
    errorMessage: "",
    contentType: "question",
    sortDialog: false
};

export function PublishReducer(state = defaultState, action) {
    switch (action.type) {
        case PUBLISH_TYPE:
            return {
                ...state,
                contentType: action.contentType
            };
        case PUBLISH_INIT_THEORIES: {
            return {
                ...state,
                theories: action.theories
            };
        }
        case PUBLISH_INIT_QUESTIONS: {
            return {
                ...state,
                questions: action.questions
            };
        }
        case PUBLISH_HAS_ERRORED: {
            return {
                ...state,
                hasErrored: action.hasErrored,
                errorMessage: action.errorMessage
            };
        }
        case PUBLISH_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            };
        }
        case PUBLISH_SORT_DIALOG:
            return {
                ...state,
                sortDialog: action.sortDialog
            };
        default:
            return state;
    }
}
