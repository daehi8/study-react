import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const Detail = () => {
  let navigate = useNavigate();
  const propsParam = useParams();
  const id = propsParam.id;

  const [book, setBook] = useState({
    id: "",
    title: "",
    author: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/book/" + id)
      .then((res) => res.json())
      .then((res) => {
        setBook(res);
      });
  }, []);

  const deleteBook = () => {
    fetch("http://localhost:8080/book/" + id, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === "ok") {
          navigate("/");
        } else {
          alert("삭제실패");
        }
      });
  };

  const modifyBook = () => {
    navigate("/modifyForm/" + id);
  };

  return (
    <div>
      <h1>책 상세보기</h1>
      <Button variant="warning" onClick={modifyBook}>
        수정
      </Button>
      {"  "}
      <Button variant="danger" onClick={deleteBook}>
        삭제
      </Button>
      <hr />
      <h3>{book.author}</h3>
      <h1>{book.title}</h1>
    </div>
  );
};

export default Detail;
