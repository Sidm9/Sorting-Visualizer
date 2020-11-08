import React, { useState, useCallback } from "react";
import "./styles.css";

export default function App() {


  const [arr, setArr] = useState([17, 3, 25, 37, 26, 28, 31, 39, 1, 29, 46, 14, 21, 6, 20, 49, 5, 47, 43, 44, 16, 18, 27, 13, 38, 9, 7, 4, 24, 33, 19, 34, 2, 36, 15]);
  const [number, setNumber] = useState(null);
  const [counter, setCounter] = useState(arr.length);


  function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick(tick => tick + 1);
    }, [])
    return update;
  }



  const forceUpdate = useForceUpdate();
  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const add = () => {
    if (Number.isInteger(parseInt(number)) && number <= 50) {
      setCounter(counter + 1);
      setArr([...arr, parseInt(number)]);

      setNumber("");
    }
    else {
      window.alert("Enter Valid Number!")
    }
  };


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const selection = async () => {

    for (let i = 0; i < counter; i++) {
      let min = i;
      for (let j = i + 1; j < counter; j++) {
        if (arr[min] > arr[j])
          min = j;
      }
      if (min !== i) {
        console.log(" swap " + arr[i] + " and " + arr[min])
        await sleep(100);
        [arr[i], arr[min]] = [arr[min], arr[i]];
        forceUpdate();
      }
    }

  }

  const bubble_Sort = async () => {

    var i, j, stop;

    for (i = 0; i < counter; i++) {
      for (j = 0, stop = counter - i; j < stop; j++) {
        if (arr[j] > arr[j + 1]) {
          await sleep(50);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          forceUpdate();
        }
      }

    }

    return arr;
  }


  const insertion = async () => {
    for (let i = 1; i < counter; i++) {

      let current = arr[i];

      let j = i - 1;
      while ((j > -1) && (current < arr[j])) {
        arr[j + 1] = arr[j];
        j--;
      }
      await sleep(50);
      arr[j + 1] = current;
      forceUpdate();
    }
    return arr;
  }


  const print = arr.map((i) => (
    <h2 className="bars" style={{ margin: 10, height: (i * 13), maxHeight: "80vh" }}>{i}</h2>
  ));


  const refresh = () => {
    window.location.reload(false);
  }


  return (
    <div className="App">
      <body>

        <h1 style={{ marginBottom: 15, letterSpacing: 15}}>  SORTING VISUALIZER </h1>
        <input
          placeholder="Enter a number"
          value={number}
          onChange={handleChange}
        />
        <button onClick={add}>Add Number</button>
        <button onClick={refresh}>Reset</button>
        <button onClick={() => setArr([])}>Clear All</button>
        <button onClick={selection}>Selection Sort</button>
        <button onClick={bubble_Sort}> Bubble Sort </button>
        <button onClick={insertion}>Insertion Sort</button>
        <div style={{ marginBottom: 10 }} />
        <h2> Size of array : {counter}</h2>
        <div style={{ marginBottom: 10 }} />

        <div className="array_container"> {print} </div>

      </body>
    </div>
  );
}
