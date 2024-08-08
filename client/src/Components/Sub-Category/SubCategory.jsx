import React, { useEffect, useState } from "react";
import styles from "./subcategory.module.css";
import { CiCircleList, CiSearch } from "react-icons/ci";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

const SubCategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]); // State for storing categories
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategorySequence, setSubcategorySequence] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSubcategory, setEditSubcategory] = useState({
    id: null,
    name: "",
    categoryId: "",
    sequence: "",
    image: null,
    imagePreview: null,
  });

  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/subcategories"
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error.message);
      }
    };

    fetchSubcategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubcategoryName("");
    setCategoryId("");
    setSubcategorySequence("");
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", subcategoryName);
    formData.append("categoryId", categoryId);
    formData.append("sequence", subcategorySequence);

    if (image) {
      formData.append("image", image);
    }

    axios
      .post("http://localhost:3005/api/subcategories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSubcategories([...subcategories, res.data]);
        closeModal();
      })
      .catch((err) => {
        console.error("Error:", err.response.data);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3005/api/subcategories/${id}`)
      .then(() => {
        setSubcategories(subcategories.filter((item) => item.id !== id));
        setDeleteModal({ open: false, id: null });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openEditModal = (subcategory) => {
    setEditSubcategory({
      id: subcategory.id,
      name: subcategory.name,
      categoryId: subcategory.categoryId,
      sequence: subcategory.sequence,
      image: null,
      imagePreview: subcategory.image
        ? `http://localhost:3005/${subcategory.image}`
        : null,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditSubcategory({
      id: null,
      name: "",
      categoryId: "",
      sequence: "",
      image: null,
      imagePreview: null,
    });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditSubcategory((prev) => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleEditSave = () => {
    const formData = new FormData();
    formData.append("name", editSubcategory.name);
    formData.append("categoryId", editSubcategory.categoryId);
    formData.append("sequence", editSubcategory.sequence);

    if (editSubcategory.image) {
      formData.append("image", editSubcategory.image);
    }

    axios
      .put(
        `http://localhost:3005/api/subcategories/${editSubcategory.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setSubcategories((prev) =>
          prev.map((item) =>
            item.id === editSubcategory.id ? { ...item, ...res.data } : item
          )
        );
        closeEditModal();
      })
      .catch((err) => {
        console.error("Error updating subcategory:", err.response.data);
      });
  };

  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <div className={styles.content}>
          <div className={styles.category}>
            <CiCircleList /> <span>Sub Category</span>
          </div>
          <div className={styles.search}>
            <CiSearch className={styles.searchIcon} />
            <input type="text" className={styles.searchInput} />
          </div>
        </div>
        <div className={styles.rbtn}>
          <button className={styles.addButton} onClick={openModal}>
            Add Sub Category
          </button>
        </div>
      </div>
      <div className={styles.bottom}>
        <table className={styles.table} cellSpacing={0}>
          <thead>
            <tr>
              <th className={styles.th}>Id</th>
              <th className={styles.th}>Sub Category Name</th>
              <th className={styles.th}>Category Id</th>
              <th className={styles.th}>Image</th>
              <th className={styles.th}>Sequence</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {subcategories.map((info, index) => (
              <>
                <tr className={styles.tr} key={index}>
                  <td>{info.id}</td>
                  <td>{info.name}</td>
                  <td>{info.Category?.name}</td>
                  <td>
                    {info.image && (
                      <img
                        src={`http://localhost:3005/${info.image}`}
                        alt="Subcategory Image"
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
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
                  <tr>
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
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Add Subcategory</h2>
            <div className={styles.modalContent}>
              <div className={styles.entryarea}>
                <input
                  type="text"
                  required
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                />
                <div className={styles.label}>Subcategory Name</div>
              </div>
              <div className={styles.entryarea}>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className={styles.label}>Category</div>
              </div>
              <div className={styles.entryarea}>
                <input
                  type="number"
                  required
                  value={subcategorySequence}
                  onChange={(e) => setSubcategorySequence(e.target.value)}
                />
                <div className={styles.label}>Subcategory Sequence</div>
              </div>
              <div className={styles.entryarea}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Selected"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <div className={styles.label}>Image</div>
              </div>
              <div className={styles.buttonarea}>
                <button onClick={closeModal}>Close</button>
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Edit Subcategory</h2>
            <div className={styles.modalContent}>
              <div className={styles.entryarea}>
                <input
                  type="text"
                  required
                  value={editSubcategory.name}
                  onChange={(e) =>
                    setEditSubcategory((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                <div className={styles.label}>Subcategory Name</div>
              </div>
              <div className={styles.entryarea}>
                <select
                  required
                  value={editSubcategory.categoryId}
                  onChange={(e) =>
                    setEditSubcategory((prev) => ({
                      ...prev,
                      categoryId: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className={styles.label}>Category</div>
              </div>
              <div className={styles.entryarea}>
                <input
                  type="number"
                  required
                  value={editSubcategory.sequence}
                  onChange={(e) =>
                    setEditSubcategory((prev) => ({
                      ...prev,
                      sequence: e.target.value,
                    }))
                  }
                />
                <div className={styles.label}>Subcategory Sequence</div>
              </div>
              <div className={styles.entryarea}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                />
                {editSubcategory.imagePreview && (
                  <img
                    src={editSubcategory.imagePreview}
                    alt="Selected"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <div className={styles.label}>Image</div>
              </div>
              <div className={styles.buttonarea}>
                <button onClick={handleEditSave}>Save</button>
                <button onClick={closeEditModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SubCategory;
