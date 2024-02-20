'use client'
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { webName } from "../globalDetails";
import DropDown from "./DropDown";
import { grades } from "./grade";
import { AnimatePresence, motion } from "framer-motion";

const RequestForm = () => {
  const [schoolName, setSchoolName] = useState([]);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [data, setData] = useState({
    userName: "",
    email: "",
    schoolName: "",
    role: "",
    grade: "",
    comment: "",
  });
  const { role, grade } = data;
  const roleRef = useRef();
  const gradeRef = useRef();

  useEffect(() => {
    fetch("/api/schoolList", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setSchoolName(data));
  }, []);

  const requestEvent = (e) => {
    e.preventDefault();
    console.log(data);
  };

  const toggleRole = () => {
    setIsRoleOpen(!isRoleOpen);
  };

  const toggleGrade = () => {
    setIsGradeOpen(!isGradeOpen);
  };

  const handleRoleClick = (value) => {
    setData({ ...data, role: value });
  };

  const handleGradeClick = (value) => {
    setData({ ...data, grade: value });
  };

  const handleSchool = (value) => {
    setData({ ...data, schoolName: value });
  };

  const Comment = "Tell us more about yourself and the purpose of using our product";

  return (
    <div className="mt-16 w-screen z-30">
      {/* Form content */}
    </div>
  );
};

export default RequestForm;