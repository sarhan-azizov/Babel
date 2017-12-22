import React, { Component } from 'react';
import blockly from 'node-blockly/browser';

import Blockly from "./component";
import styles from './container.css';

//import example from "./example.html";
//import toolbox from "./toolbox.html";

blockly.Blocks['run_task'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("run")
            .appendField(new blockly.FieldDropdown([["select task", "select-task"], ["one1", "1"], ["two", "2"], ["three", "3"]]), "run_task_dropdown")
            .appendField(new blockly.FieldImage("http://clustrmaps.com/assets/clustrmaps/img/1024px-Infobox_info_icon.svg-white.png", 15, 15, "*"));
        this.setEditable(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(124);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

class BlocklyContainer extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            modal: {
                x: -500,
                y: -500,
                cb: undefined
            }
        }
        this.handleCloseRunTask = this.handleCloseRunTask.bind(this);
    }

    handleCloseRunTask() {
        this.setState({
            modal: {
                x: -500,
                y: -500,
                cb: undefined
            }
        })
    }

    componentDidMount() {
        this.workspace = blockly.inject(this.props.id, { toolbox: document.getElementById('toolbox') });

        blockly.Xml.domToWorkspace(document.getElementById('example'), this.workspace);
        this.workspace.addChangeListener(this.handleChange);

        document.addEventListener('click', (e) => {
            const selectTask = document.querySelector('.select-task');
            if (!selectTask.contains(e.target)) {
                this.handleCloseRunTask();
            }
        })
    }

    handleChange(e) {
        if (e.element === 'click' && e.type === blockly.Events.UI) {
            const block = this.workspace.getBlockById(e.blockId);
            const field = block.getField("run_task_dropdown");
console.log('block', block);
            //console.log('change', field.getAbsoluteXY_());
            if (field){
                this.setState({
                    modal: {
                        x: field.getAbsoluteXY_().x,
                        y: field.getAbsoluteXY_().y + 20,
                        cb: ({ target }) => {
                            field.setValue(`${target.value}`);
                            this.handleCloseRunTask();
                        }
                    }
                });
            }
        }
    };

    handleSubmit() {
        const xml = blockly.Xml.workspaceToDom(this.workspace);
        
        const prettyXml = blockly.Xml.domToPrettyText(xml);
        console.groupCollapsed('XML');
        console.log(prettyXml);
        console.groupEnd();
    }

    render() {
        return (
            <div>
                <ul
                    className="select-task"
                    style={{
                        top: `${this.state.modal.y}px`,
                        left: `${this.state.modal.x}px`,
                    }}
                >
                    <li value="1" onClick={this.state.modal.cb}>one</li>
                    <li value="2" onClick={this.state.modal.cb}>two</li>
                    <li value="3" onClick={this.state.modal.cb}>three</li>
                </ul>
                <Blockly id={this.props.id}/>
                <button onClick={this.handleSubmit}>submit</button>
            </div>
        )
    }
}

export default BlocklyContainer;