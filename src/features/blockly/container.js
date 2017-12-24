import React, { Component } from 'react';
import blockly from 'node-blockly/browser';
import Modal from 'react-modal';
import serialize from 'form-serialize';

import Blockly from "./component";
import styles from './container.css';

//import example from "./example.html";
//import toolbox from "./toolbox.html";

blockly.Blocks['run_task'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("run")
            .appendField(new blockly.FieldDropdown([["select task", "ss"], ["create new user", "1"], ["log in", "2"], ["install Software", "3"], ["sent logs", "4"]]), "run_task_dropdown")
            .appendField(new blockly.FieldImage("http://clustrmaps.com/assets/clustrmaps/img/1024px-Infobox_info_icon.svg-white.png", 15, 15, "*"));
        this.setEditable(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
    }
};

blockly.Blocks['run_task_condition'] = {
    init: function () {
        this.appendValueInput("run_task_input")
            .appendField("run")
            .appendField(new blockly.FieldDropdown([["select task", "ss"], ["create new user", "1"], ["log in", "2"], ["install Software", "3"], ["sent logs", "4"]]), "run_task_dropdown")
            .appendField(new blockly.FieldImage("http://clustrmaps.com/assets/clustrmaps/img/1024px-Infobox_info_icon.svg-white.png", 15, 15, "*"));
        this.setEditable(false);
        this.setOutput(true, null);
        this.setColour(120);
    }
};

blockly.Blocks['run_task_and_or'] = {
    init: function () {
        this.appendValueInput("run_task_and_or")
            .appendField(new blockly.FieldDropdown([["and", "and"], ["or", "or"]]), "dropdown_and_or");
        this.setOutput(true, null);
        this.setColour(60);
    }
};

class BlocklyContainer extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRunTask = this.handleRunTask.bind(this);

        this.state = {
            x: -500,
            y: -500,
            cb: undefined,
            open: false
        }
        this.handleCloseRunTask = this.handleCloseRunTask.bind(this);
        this.mapBlockIdTodata = {};
    }


    handleCloseRunTask() {
        this.setState({
            x: -500,
            y: -500,
            cb: undefined,
            open: false
        })
    }

    componentDidMount() {
        this.workspace = blockly.inject(this.props.id, {
            horizontalLayout: true,
            toolbox: document.getElementById('toolbox'),
            trashcan: true,
            zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            }
        });

        //console.log('workspace', this.workspace);

        this.workspace.trashcan.svgGroup_.onclick = () => {
            this.workspace.clear();
        };

        const xml = document.getElementById('example');

        blockly.Xml.domToWorkspace(xml, this.workspace);

        this.workspace.addChangeListener(this.handleChange);

        //console.log('=>', this.workspace.getAllBlocks());

        /* if (e.element === 'move' && e.type === blockly.Events.UI) {
            const block = this.workspace.getBlockById(e.blockId);
            block.inputList[0].fieldRow[2].imageElement_.onmouseover = (e) => {
                console.log('icon', e.target);
            };
        }*/

        /*document.addEventListener('click', (e) => {
            const selectTask = document.querySelector('.select-task');
            if (!selectTask.contains(e.target)) {
                //this.handleCloseRunTask();
            }
        })*/
    }

    handleChange(e) {
        if (e.element === 'click' && e.type === blockly.Events.UI) {
            const block = this.workspace.getBlockById(e.blockId);
            const field = block.getField("run_task_dropdown");

            //console.log('change', field.getAbsoluteXY_());
            if (field) {
                this.setState({
                    x: field.getAbsoluteXY_().x,
                    y: field.getAbsoluteXY_().y + 20,
                    cb: ({ target }) => {
                        this.blockId = e.blockId;
                        this.field = field;
                        this.value = target.value;
                        this.setState({
                            open: true
                        })
                    }
                });
            }
        }
    };

    handleRunTask(deta) {
        deta.preventDefault();
        this.mapBlockIdTodata[this.blockId] = serialize(deta.target, { hash: true });
        this.field.setValue(`${this.value}`);
        this.handleCloseRunTask();
    }

    handleSubmit() {
        const xml = blockly.Xml.workspaceToDom(this.workspace);
        //console.log('this.mapBlockIdTodata', this.mapBlockIdTodata);
        [...xml.getElementsByTagName('block')].forEach((block) => {
            const data = this.mapBlockIdTodata[block.id];
            if(this.mapBlockIdTodata[block.id]) {
          //      console.log('block', block);
                block.querySelector('[name="run_task_dropdown"]').innerHTML = JSON.stringify(data);
            }
        });
        const prettyXml = blockly.Xml.domToPrettyText(xml);
        console.groupCollapsed('XML');
        console.log('xml', xml);
        console.groupEnd();
        console.groupCollapsed('prettyXml');
        console.log(prettyXml);
        console.groupEnd();
    }

    render() {
        return (
            <div>
                {!this.state.open && <div className="select-task"
                                          style={{
                                              top: `${this.state.y}px`,
                                              left: `${this.state.x}px`,
                                          }}
                >
                    <div>My Custom component</div>
                    <ul>
                        <li value="1" onClick={this.state.cb}>create new user</li>
                        <li value="2" onClick={this.state.cb}>log in</li>
                        <li value="3" onClick={this.state.cb}>install Software</li>
                        <li value="4" onClick={this.state.cb}>sent logs</li>
                    </ul>
                </div>}
                <Blockly id={this.props.id}/>
                <Modal
                    isOpen={this.state.open}
                    onRequestClose={this.handleCloseRunTask}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0,0,0,0.1)'
                        },
                        content: {
                            position: 'absolute',
                            top: '40px',
                            left: '40px',
                            right: '40px',
                            bottom: 'auto',
                            border: '1px solid #ccc',
                            background: '#fff',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: '20px'

                        }
                    }}
                >
                    <form id="sed" onSubmit={this.handleRunTask}>
                    {(this.value === 1 || this.value === 2) &&
                        <div>
                        Create User
                        <hr />
                        <div>Name: <input name="username" type="text"/></div>
                        <div>Password: <input name="userpassword" type="password"/></div>
                        </div>
                    }
                    {this.value === 3 &&
                    <div>
                        Select install software
                        <hr />
                        <div><select><option>select software</option><option>some antivirus program</option></select></div>
                    </div>
                    }
                    {this.value === 4 &&
                    <div>
                        Sent logs
                        <hr />
                        <div>email: <input name="email" type="text"/></div>
                    </div>
                    }
                    <input type="submit" value="run task" />
                    </form>
                </Modal>
                <button onClick={this.handleSubmit}>submit</button>
            </div>
        )
    }
}

export default BlocklyContainer;