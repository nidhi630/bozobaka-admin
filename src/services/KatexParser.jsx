"use strict";

import React from "react";
import HtmlToReact, {Parser} from "html-to-react";
import {InlineMath, BlockMath} from "react-katex";
import he from "he";

let processNodeDefinitions, processingInstructions, htmlToReactParser;
let init = false;

function initVariables() {
    processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    processingInstructions = [
        {
            replaceChildren: true,
            shouldProcessNode: (node) => (node.attribs && (node.attribs['data-katex'] === 'inline' || node.attribs['data-katex'] === 'block')),
            processNode: (node, children) => {
                if (children && children.length > 0) {
                    let type = node.attribs["data-katex"];
                    switch (type) {
                        case 'inline':
                            return <InlineMath>{children[0]}</InlineMath>;
                        case 'block':
                            return <BlockMath>{children[0]}</BlockMath>;
                    }
                }
            }
        },
        {
            shouldProcessNode: (node) => (true),
            processNode: processNodeDefinitions.processDefaultNode
        }
    ];
    htmlToReactParser = new Parser();
}

export function parseKatex(html) {
    if (!init) initVariables();
    let dom = he.decode(html);
    return htmlToReactParser.parseWithInstructions(dom, () => true, processingInstructions);
}

export function resetVariables() {
    processNodeDefinitions = processingInstructions = htmlToReactParser = null;
    init = false;
}