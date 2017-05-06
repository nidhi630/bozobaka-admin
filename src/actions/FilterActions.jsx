"use strict";

import {
    FILTER_MAX_DIFFICULTY,
    FILTER_MIN_DIFFICULTY,
    FILTER_ID,
    FILTER_HEADING,
    FILTER_QUESTION,
    FILTER_STATUS,
    FILTER_L1,
    FILTER_L2,
    FILTER_SOURCE,
    FILTER_SECTION,
    FILTER_QT
} from "./../actions/ActionConstants";

export function setId(id) {
    return {
        type: FILTER_ID,
        id
    };
}

export function setMinDifficulty(minDifficulty) {
    return {
        type: FILTER_MIN_DIFFICULTY,
        minDifficulty
    };
}

export function setMaxDifficulty(maxDifficulty) {
    return {
        type: FILTER_MAX_DIFFICULTY,
        maxDifficulty
    };
}

export function setHeading(heading) {
    return {
        type: FILTER_HEADING,
        heading
    };
}

export function setQuestion(question) {
    return {
        type: FILTER_QUESTION,
        question
    };
}

export function setStatus(status) {
    return {
        type: FILTER_STATUS,
        status
    };
}

export function setSection(sectionId) {
    return {
        type: FILTER_SECTION,
        sectionId
    };
}

export function setL1(l1Id) {
    return {
        type: FILTER_L1,
        l1Id
    };
}

export function setL2(l2Id) {
    return {
        type: FILTER_L2,
        l2Id
    };
}

export function setSource(sourceId) {
    return {
        type: FILTER_SOURCE,
        sourceId
    };
}

export function setQT(qt) {
    return {
        type: FILTER_QT,
        qt
    };
}

function getCommonFilters(state) {
    const {id, status, sectionId, l1Id, l2Id, sourceId} = state.filters;
    const filter = {
        courseId: state.ContentReducer.selectedCourse.id
    };
    if (id) {
        filter.id = {ilike: id};
    }
    if (status) {
        filter.status = status;
    }
    if (sectionId) {
        filter.sectionId = sectionId;
    }
    if (l1Id) {
        filter.l1Id = l1Id;
    }
    if (l2Id) {
        filter.l2Id = l2Id;
    }
    if (sourceId) {
        filter.sourceId = sourceId;
    }
    return filter;
}

export function getQuestionFilter(state) {
    const {question, minDifficulty, maxDifficulty} = state.filters;
    const filter = getCommonFilters(state);

    filter.difficulty = {
        between: [minDifficulty, maxDifficulty]
    };

    if (question) {
        filter.question = {regexp: "/" + question + "/i"};
    }

    return filter;
}

export function getTheoryFilter(state) {
    const {heading} = state.filters;
    const filter = getCommonFilters(state);

    if (heading) {
        filter.heading = {regexp: "/" + heading + "/i"};
    }

    return filter;
}

