import React from 'react';

import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";

function ExpenseItem(props) {
  // function clickHandler() {}
  // const [title, setTitle] = useState(props.title);
  // console.log('ExpenseItem evaluated by React');

  // const clickHandler = () => {
  //   setTitle('Updated !');
  //   console.log(title);
  // };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      {/* <button>Change Title</button> */}
    </Card>
  );
}

export default ExpenseItem;
