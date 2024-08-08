import React from "react";
import styles from "./sidebar.module.css";
import { IoMdArrowDropright } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { CiCircleList } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  return (
    <section className={styles.container}>
      <div className={styles.sidebar}>
        <table cellSpacing={0}>
          <tbody>
            <tr
              onClick={() => {
                navigate("/dashboard");
              }}
              className={location.pathname == "/dashboard" ? styles.active : ""}
            >
              <td className={styles.pic}>
                <IoHomeOutline className={styles.icon} />
              </td>
              <td className={styles.text}>Dashboard</td>
              <td className={styles.arrow}>
                <IoMdArrowDropright />{" "}
              </td>
            </tr>
            <tr
              onClick={() => {
                navigate("/category");
              }}
              className={location.pathname == "/category" ? styles.active : ""}
            >
              <td className={styles.pic}>
                <BiCategoryAlt className={styles.icon} />
              </td>
              <td className={styles.text}>Category</td>
              <td className={styles.arrow}>
                <IoMdArrowDropright />{" "}
              </td>
            </tr>
            <tr
              onClick={() => {
                navigate("/sub-category");
              }}
              className={
                location.pathname == "/sub-category" ? styles.active : ""
              }
            >
              <td className={styles.pic}>
                <CiCircleList className={styles.icon} />
              </td>
              <td className={styles.text}>Subcategory</td>
              <td className={styles.arrow}>
                <IoMdArrowDropright />{" "}
              </td>
            </tr>

            <tr onClick={() => {
                navigate("/product");
              }}
              className={
                location.pathname == "/product" ? styles.active : ""
              }>
              <td className={styles.pic}>
                <BsBoxSeam className={styles.icon} />
              </td>
              <td className={styles.text}>Products</td>
              <td className={styles.arrow}>
                <IoMdArrowDropright />{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Sidebar;
