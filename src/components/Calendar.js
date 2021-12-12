import React, { useState } from "react";
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from "react-modal";

const Calendar = ({ userObj }) => {
  const [eventColor, SetEventColor] = useState("red");
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState({});
  const [everydayBtn, setEverydayBtn] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: '이벤투1',
      start: '2021-12-14T10:00',
      end: '2021-12-14T12:00',
    },
    {
      id: 2,
      title: 'event 2',
      start: '2021-12-16T13:00',
      end: '2021-12-16T18:00',
    },
    { id: 3, title: 'event 3', start: '2021-12-17', end: '2021-12-20' },
    { id: 4, title: 'event 4', start: '2021-12-18', end: '2021-12-18' },
  ]);
  const [startDay, setStartDay] = useState("");
  const [startTime, setStartTime] = useState("");

  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  Modal.setAppElement("#root");

  const toggleModal = (arg) => {
    setIsOpen((prev) => !prev);
    setStartDay(arg.dateStr);
  }

  const handleDateClick = (arg) => { // bind with an arrow function calendar 클릭 이벤트
    alert(arg.dateStr)
  }

  let str = formatDate(new Date(), {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  });

  const eventClick = (e) => {
    console.log(e.event.id)
  }

  const newButtonClick = () => {
    console.log('new event')
  }

  const onAddCalendar = (event) => {
    event.preventDefault();
    console.log("서브밋!");
  }

  const onStartTimeChange = (event) => {
    const { target: { name, value } } = event;
    if (name === "startTime") {
      setStartTime(value);
    }
  }

  const onEndDateChange = (event) => {
    const { target: { name, value } } = event;
    if (name === "endDate") {
      setEndDate(value);
    } else if (name === "endTime") {
      setEndTime(value);
    }
  }

  const toggleBtn = (arg) => {
    setEverydayBtn((prev) => !prev);
  }
  console.log(endDate);

  return (
    <>
      <div>
        <Modal
          style={{
            overlay: {
              position: 'fixed',
              zIndex: 1050,
              top: 300,
              left: 200,
              right: 600,
              bottom: 300,
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
              position: 'fixed',
              top: 300,
              left: 200,
              right: 600,
              bottom: 300,
              border: '1px solid #ccc',
              background: 'rgba(255, 255, 255, 0.8)',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}

          isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="My dialog"
        >
          <div>일정 추가</div>
          <input type="checkbox" value={everydayBtn} onClick={toggleBtn} />
          <span>종일</span>
          <form onSubmit={onAddCalendar}>
            {everydayBtn ?
              <>
                <span>시작시간</span>
                <input type="date"
                  value={startDay}
                  readOnly />
                <br />
                <span>종료시간</span>
                <input type="date"
                  value={endDate}
                  onChange={onEndDateChange}
                />
              </>
              :
              <>
                <span>시작시간</span>
                <input type="date"
                  value={startDay}
                  readOnly />
                <input name="startTime" type="time" value={startTime} onChange={onStartTimeChange} />
                <br />
                <span>종료시간</span>
                <input
                  name="endDate"
                  type="date"
                  value={endDate}
                  onChange={onEndDateChange}
                />
                <input name="endTime" type="time" value={endTime} onChange={onEndDateChange} />
              </>

            }
            <button type="submit">완료</button>

          </form>
          <button onClick={toggleModal}>닫기</button>

        </Modal>
      </div>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            center: 'dayGridMonth,timeGridWeek,timeGridDay new',
          }}
          dateClick={toggleModal} // 클릭 이벤트
          customButtons={{
            new: {
              text: 'new',
              click: newButtonClick,
            },
          }}
          eventClick={eventClick}
          events={events}
          eventColor={eventColor}
        />
      </div>

    </>


  );

}

export default Calendar;