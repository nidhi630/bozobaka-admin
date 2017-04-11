"use strict";

import React from "react";
import HtmlToReact, {Parser} from "html-to-react";
import {InlineMath} from "react-katex";

let processNodeDefinitions, processingInstructions, htmlToReactParser, domParser;
let init = false;

function initVariables() {
    processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    processingInstructions = [
        {
            replaceChildren: true,
            shouldProcessNode: (node) => (node.attribs && node.attribs['data-katex'] === 'inline-math'),
            processNode: (node, children) => {
                if (children && children.length > 0) {
                    return <InlineMath math={children[0]}/>;
                }
            }
        },
        {
            shouldProcessNode: (node) => (true),
            processNode: processNodeDefinitions.processDefaultNode
        }
    ];
    htmlToReactParser = new Parser();
    domParser = new DOMParser;
}

export function parseKatex(html) {
    if (!init) initVariables();
    let dom = domParser.parseFromString(html, 'text/html');
    console.log("dom created", dom.body.textContent);
    return htmlToReactParser.parseWithInstructions(dom.body.textContent, () => true, processingInstructions);
}

export function resetVariables() {
    processNodeDefinitions = processingInstructions = htmlToReactParser = domParser = null;
    init = false;
}