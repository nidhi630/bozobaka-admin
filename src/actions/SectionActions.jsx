"use strict";

import ContentService from "./../services/ContentService";
import {INIT_SECTIONS, DELETE_SECTIONS, INIT_L1S, INIT_L2S, INIT_L3S, INIT_L4S} from "./ActionConstants";

export function initSections(sections) {
    return {
        type: INIT_SECTIONS,
        sections
    };
}

export function deleteSections() {
    return {
        type: DELETE_SECTIONS
    };
}

export function initL1s(l1s) {
    return {
        type: INIT_L1S,
        l1s
    };
}

export function initL2s(l2s) {
    return {
        type: INIT_L2S,
        l2s
    };
}

export function initL3s(l3s) {
    return {
        type: INIT_L3S,
        l3s
    };
}

export function initL4s(l4s) {
    return {
        type: INIT_L4S,
        l4s
    };
}

export function getSections(params) {
    return (dispatch) => {
        dispatch(deleteSections());
        ContentService.fetchSections(params)
            .then((res) => {
                let content = extractContentHierarchy(res);
                dispatch(initSections(content.sections));
                dispatch(initL1s(content.l1s));
                dispatch(initL2s(content.l2s));
                dispatch(initL3s(content.l3s));
                dispatch(initL4s(content.l4s));
            })
            .catch((err) => {
                console.log(err);
                /* TODO: add error to sections state */
            });
    };
}

function extractContentHierarchy(res) {
    let sections = [], l1s = [], l2s = [], l3s = [], l4s = [];

    res.forEach((section) => {
        sections.push({
            id: section.id,
            name: section.name,
            courseId: section.courseId
        });
        section.l1s.forEach((l1) => {
            l1s.push({
                id: l1.id,
                name: l1.name,
                sectionId: l1.sectionId
            });
            l1.l2s.forEach((l2) => {
                l2s.push({
                    id: l2.id,
                    name: l2.name,
                    l1Id: l2.l1Id
                });
                l2.l3s.forEach((l3) => {
                    l3s.push({
                        id: l3.id,
                        name: l3.name,
                        l2Id: l3.l2Id
                    });
                    l3.l4s.forEach((l4) => {
                        l4s.push({
                            id: l4.id,
                            name: l4.name,
                            l3Id: l4.l3Id
                        });
                    });
                });
            });
        });
    });

    return {
        sections,
        l1s,
        l2s,
        l3s,
        l4s
    };
}
