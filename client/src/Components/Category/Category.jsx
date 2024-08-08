import React, { useEffect, useState } from "react";
import styles from "./category.module.css";
import { BiCategoryAlt } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

const Category = () => {
  const [product, setProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categorySequence, setCategorySequence] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState({
    id: null,
    name: "",
    sequence: "",
    status: true,
    image: null,
    imagePreview: null,
  });

  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  const startingId = 201;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/categories"
        );
        // console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, [product]);

  // console.log(product);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryName("");
    setCategorySequence("");
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    // Create a FormData object to handle the file upload
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("status", true);
    formData.append("sequence", categorySequence);

    // Check if an image file is selected and append it
    if (image) {
      formData.append("image", image);
    }

    axios
      .post("http://localhost:3005/api/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type is set
        },
      })
      .then(() => {
        console.log("Data is Posted Successfully");
        closeModal();
      })
      .catch((err) => {
        console.error("Error:", err.response.data);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3005/api/categories/${id}`)
      .then(() => {
        console.log("Deleted");
        setProduct(product.filter((item) => item.id !== id));
        setDeleteModal({ open: false, id: null });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openEditModal = (category) => {
    setEditCategory({
      id: category.id,
      name: category.name,
      sequence: category.sequence,
      status: category.status,
      image: null,
      imagePreview: category.image
        ? `http://localhost:3005/${category.image}`
        : null,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditCategory({
      id: null,
      name: "",
      sequence: "",
      status: true,
      image: null,
      imagePreview: null,
    });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditCategory((prev) => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleEditSave = () => {
    // console.log(editCategory);

    const formData = new FormData();
    formData.append("name", editCategory.name);
    formData.append("sequence", editCategory.sequence);
    formData.append("status", editCategory.status);

    if (editCategory.image) {
      formData.append("image", editCategory.image);
    }

    axios
      .put(
        `http://localhost:3005/api/categories/${editCategory.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("Category updated successfully", res.data);
        closeEditModal();

        // Update the state with the response data
        setProduct((prev) =>
          prev.map((item) =>
            item.id === editCategory.id ? { ...item, ...res.data } : item
          )
        );
      })
      .catch((err) => {
        console.error("Error updating category:", err.response.data);
      });
  };
  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <div className={styles.content}>
          <div className={styles.category}>
            <BiCategoryAlt /> <span>Category</span>
          </div>
          <div className={styles.search}>
            <CiSearch className={styles.searchIcon} />
            <input type="text" className={styles.searchInput} />
          </div>
        </div>
        <div className={styles.rbtn}>
          <button className={styles.addButton} onClick={openModal}>
            Add Category
          </button>
        </div>
      </div>
      <div className={styles.bottom}>
        <table className={styles.table} cellSpacing={0}>
          <thead>
            <tr>
              <th className={styles.th}>Id</th>
              <th className={styles.th}>Category Name</th>
              <th className={styles.th}>Image</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Sequence</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {product.map((info, index) => {
              const rowId = startingId + index;
              return (
                <>
                  <tr className={styles.tr} key={index}>
                    <td>{rowId}</td>
                    <td>{info.name}</td>
                    <td>
                      {info.image && (
                        <img
                          src={`http://localhost:3005/${info.image}`}
                          alt="Category Image"
                          style={{ width: "50px", height: "50px" }}
                        />
                      )}
                    </td>
                    <td
                      className={
                        info.status
                          ? styles.activeStatus
                          : styles.inactiveStatus
                      }
                    >
                      {info.status ? "Active" : "Inactive"}
                    </td>
                    <td>{info.sequence}</td>
                    <td className={styles.action}>
                      <FaRegEdit
                        className={styles.edit}
                        onClick={() => openEditModal(info)}
                      />
                      <MdDeleteOutline
                        className={styles.delete}
                        onClick={() =>
                          setDeleteModal({ open: true, id: info.id })
                        }
                      />
                    </td>
                  </tr>
                  {deleteModal.open && deleteModal.id === info.id && (
                    <td colSpan="6">
                      <div className={styles.userMenu}>
                        <div className={styles.message}>
                          <h3>
                            <IoIosWarning className={styles.warn} /> Delete
                          </h3>
                          <p>Are you sure you want to delete?</p>
                        </div>
                        <div className={styles.btn}>
                          <button
                            onClick={() =>
                              setDeleteModal({ open: false, id: null })
                            }
                          >
                            Cancel
                          </button>
                          <button onClick={() => handleDelete(deleteModal.id)}>
                            Confirm
                          </button>
                        </div>
                      </div>
                    </td>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Add Category</h2>
            <div className={styles.modalContent}>
              <div className={styles.entryarea}>
                <input
                  type="text"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <div className={styles.label}>Category Name</div>
              </div>
              <div className={styles.entryarea}>
                <input
                  type="number"
                  required
                  value={categorySequence}
                  onChange={(e) => setCategorySequence(e.target.value)}
                />
                <div className={styles.label}>Category Sequence</div>
              </div>
              <div className={styles.entryarea}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className={styles.label}>Upload Image</div>
              </div>
              {imagePreview && (
                <div className={styles.imagePreview}>
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={closeModal}>
                Cancel
              </button>
              <button className={styles.saveButton} onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Edit Category</h2>
            <div className={styles.modalContent}>
              <div className={styles.entryarea}>
                <input
                  type="text"
                  required
                  value={editCategory.name}
                  onChange={(e) =>
                    setEditCategory((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                <div className={styles.label}>Category Name</div>
              </div>
              <div className={styles.entryarea}>
                <input
                  type="number"
                  required
                  value={editCategory.sequence}
                  onChange={(e) =>
                    setEditCategory((prev) => ({
                      ...prev,
                      sequence: e.target.value,
                    }))
                  }
                />
                <div className={styles.label}>Category Sequence</div>
              </div>
              <div className={styles.entryarea}>
                <select
                  value={editCategory.status}
                  onChange={(e) =>
                    setEditCategory((prev) => ({
                      ...prev,
                      status: e.target.value === "true",
                    }))
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                <div className={styles.label}>Status</div>
              </div>
              <div className={styles.entryarea}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                />
                <div className={styles.label}>Upload Image</div>
              </div>
              {editCategory.imagePreview && (
                <div className={styles.imagePreview}>
                  <img src={editCategory.imagePreview} alt="Preview" />
                </div>
              )}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={closeEditModal}>
                Cancel
              </button>
              <button className={styles.saveButton} onClick={handleEditSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Category;
