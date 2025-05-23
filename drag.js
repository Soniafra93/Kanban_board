const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

// whenever we drag the draggables we add the class is-dragging class to the task
// when we stop dragging we remove the is-dragging class to the task
draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    //this constant is calling a function which, based on the y position of our mouse will find the closest task below our mouse
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
    //if we don't have a bottomTask, in that zone we want to append our current task, else we want to append it before the bottomTask
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");
  //here we are selecting all the task close to our mouse, just not the one that is being dragged

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;
  //closestTaskstore is a variable to store the reference to the closest task
  //closestOffset is a negative number closest to zero based on that event (the minus pixel as distance between the mouse and closest task)

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    //getBoundingClientRect will find the top of that task

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};
