
import { useState } from 'react';
function TodoApp() {
    let date = new Date()
    let weekNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = (months[date.getMonth()]);
    let weekName = (weekNames[date.getDay() - 1]);
    let currentDate = date.getDate();
    let year = date.getFullYear();
    

    //..........declaring state values.............................
    let classnames = ["col-9", "textField"];
    const [textValue, setTextValue] = useState("");
    const [storeTasks, setStoreTasks] = useState([]);
    const [storeIndex, setStoreIndex] = useState(undefined);
    const [storeIndexDelete, setStoreIndexDelete] = useState(undefined);

    //..................change color dynamically........................
    if (textValue === "Please enter min 3 characters")
        classnames = [...classnames, "modifiedRed"];
    else if ((textValue).length >= 3)
        classnames = [...classnames, "modifiedGreen"];
    else if ((textValue).length < 3 && (textValue).length > 0)
        classnames = [...classnames, "modifiedRed"];


    //................input value monitoring after change.................
    const handleOnChange = (event) => {
        setTextValue(event.target.value);
    }
    //.................after click add button actions...........................
    const tasks = () => {
        if (textValue === "Please enter min 3 characters") setTextValue("")
        else if ((textValue).length >= 3) {
            setStoreTasks([...storeTasks, textValue])
            setTextValue("");
        }
        else (setTextValue("Please enter min 3 characters"));


        //..............edit button action........................
        if (storeIndex !== undefined) {
            let toDo = storeTasks.map((task, index) => {
                if (storeIndex === index) {
                    if (textValue.length >= 3)
                        return textValue;
                    else return task
                }
                else return task;
            })
            setStoreTasks(toDo)
            setStoreIndex(undefined);
        }
    }

    let editButton = (indexValue) => {
        setTextValue(storeTasks[indexValue])
        setStoreIndex(indexValue);
    }
    //...............delete button action..........................
    let deleteButton = (rowIndex) => setStoreIndexDelete(rowIndex);
    if (storeIndexDelete !== undefined) {
        let deleteTask = storeTasks.filter((value, index) => {
            console.log((index !== storeIndexDelete))
            return ((index !== storeIndexDelete))
        })
        setStoreTasks(deleteTask)
        setStoreIndexDelete(undefined);
    }




    return (
        <div className="mainBox">
            <div className="contentBox">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item navItems" role="presentation">
                        <button className="navlink active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">To Do List</button>
                    </li>
                    
                </ul>
                <div className="tab-content tabContent" id="pills-tabContent">
                    <div className="tab-pane fade show active homeContent" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="dateFormat">
                            <h1 className="week">{weekName}</h1>
                            <p className="date">{month + " " + currentDate + ", " + year}</p>
                        </div>
                        <div className="inputIconField">
                            
                            <input className={classnames.join(" ")} type="text" onChange={handleOnChange} value={textValue} placeholder="Add a task..."></input>
                            <button className="inputButton col-3" onClick={tasks}>Add +</button>
                        </div>

                        {
                            ((storeTasks.length>0)?(
                                <div className="listsInTable col-12">
                            <table className="table table-dark tableListContent">
                                <thead>
                                    <tr className="tableRows" id="firstHeadingRow">
                                        <th scope="col" className="firstRow">S.No</th>
                                        <th scope="col" className="firstRow">Tasks</th>
                                        <th scope="col" className="firstRow">Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {storeTasks.map((rowList, index) => {
                                        return (
                                            <tr className="tableRows" key={index}>
                                                <th className="firstColumn col-2" scope="row">
                                                    <input className="checkBox" type="checkbox" />{index + 1}</th>
                                                <td className="secondColumn col-7">{rowList}</td>
                                                <td className="thirdColumn col-3">
                                                    <button className="editButton" onClick={() => { editButton(index) }} >Edit</button>
                                                    <button className="deleteButton" onClick={() => { deleteButton(index) }}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                            ):(
                                <p className="conditionalPara">Please add a task</p>
                            ))
                        }



                        
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" ></div>
                </div>
            </div>
        </div>

    );

}
export default TodoApp;

