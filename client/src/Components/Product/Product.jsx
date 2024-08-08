import React, { useEffect, useState } from "react";
import styles from "./product.module.css";
import { BiCategoryAlt } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [productSubcategoryId, setProductSubcategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState({
    id: null,
    name: "",
    categoryId: "",
    subcategoryId: "",
    status: true,
    image: null,
    imagePreview: null,
  });

  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  // Fetch products, categories, and subcategories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, subcategoriesRes] =
          await Promise.all([
            axios.get("http://localhost:3005/api/products"),
            axios.get("http://localhost:3005/api/categories"),
            axios.get("http://localhost:3005/api/subcategories"),
          ]);

        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setSubcategories(subcategoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductName("");
    setProductCategoryId("");
    setProductSubcategoryId("");
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
    formData.append("name", productName);
    formData.append("categoryId", productCategoryId);
    formData.append("subcategoryId", productSubcategoryId);
    formData.append("status", true);

    if (image) {
      formData.append("image", image);
    }

    axios
      .post("http://localhost:3005/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("Product is Posted Successfully");
        closeModal();
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3005/api/products/${id}`)
      .then(() => {
        console.log("Deleted");
        setProducts(products.filter((item) => item.id !== id));
        setDeleteModal({ open: false, id: null });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openEditModal = (product) => {
    setEditProduct({
      id: product.id,
      name: product.name,
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId,
      status: product.status,
      image: null,
      imagePreview: product.image
        ? `http://localhost:3005/${product.image}`
        : null,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditProduct({
      id: null,
      name: "",
      categoryId: "",
      subcategoryId: "",
      status: true,
      image: null,
      imagePreview: null,
    });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditProduct((prev) => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleEditSave = () => {
    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("categoryId", editProduct.categoryId);
    formData.append("subcategoryId", editProduct.subcategoryId);
    formData.append("status", editProduct.status);

    if (editProduct.image) {
      formData.append("image", editProduct.image);
    }

    axios
      .put(`http://localhost:3005/api/products/${editProduct.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Product updated successfully", res.data);
        closeEditModal();

        setProducts((prev) =>
          prev.map((item) =>
            item.id === editProduct.id ? { ...item, ...res.data } : item
          )
        );
      })
      .catch((err) => {
        console.error("Error updating product:", err.response.data);
      });
  };

  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <div className={styles.content}>
          <div className={styles.category}>
            <BsBoxSeam /> <span>Product</span>
          </div>
          <div className={styles.search}>
            <CiSearch className={styles.searchIcon} />
            <input type="text" className={styles.searchInput} />
          </div>
        </div>
        <div className={styles.rbtn}>
          <button className={styles.addButton} onClick={openModal}>
            Add Product
          </button>
        </div>
      </div>
      <div className={styles.bottom}>
        <table className={styles.table} cellSpacing={0}>
          <thead>
            <tr>
              <th className={styles.th}>Id</th>
              <th className={styles.th}>Product Name</th>
              <th className={styles.th}>Image</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Category</th>
              <th className={styles.th}>Subcategory</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {products.map((info, index) => {
              const category = categories.find(
                (cat) => cat.id === info.categoryId
              );
              const subcategory = subcategories.find(
                (sub) => sub.id === info.subcategoryId
              );

              return (
                <>
                  <tr className={styles.tr} key={index}>
                    <td>{info.id}</td>
                    <td>{info.name}</td>
                    <td>
                      {info.image && (
                        <img
                          src={`http://localhost:3005/${info.image}`}
                          alt="Product Image"
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
                    <td>{category ? category.name : "N/A"}</td>
                    <td>{subcategory ? subcategory.name : "N/A"}</td>
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
                    <td colSpan="7">
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

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Add Product</h2>
            <div className={styles.modalContent}>
              <div className={styles.entryarea}>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <div className={styles.label}>Product Name</div>
              </div>
              <div className={styles.entryarea}>
                <select
                  required
                  value={productCategoryId}
                  onChange={(e) => setProductCategoryId(e.target.value)}
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
                <select
                  required
                  value={productSubcategoryId}
                  onChange={(e) => setProductSubcategoryId(e.target.value)}
                  disabled={!productCategoryId} // Disable subcategory select if category not selected
                >
                  <option value="">Select Subcategory</option>
                  {subcategories
                    .filter((sub) => sub.categoryId === productCategoryId)
                    .map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                </select>
                <div className={styles.label}>Subcategory</div>
              </div>
              <div className={styles.entryarea}>
                <input type="file" required onChange={handleImageChange} />
                <div className={styles.label}>Image</div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </div>
              <div className={styles.actions}>
                <button onClick={closeModal}>Cancel</button>
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Edit Product</h2>
            <div className={styles.modalContent}>
              <div className={styles.entryarea}>
                <input
                  type="text"
                  required
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                />
                <div className={styles.label}>Product Name</div>
              </div>
              <div className={styles.entryarea}>
                <select
                  required
                  value={editProduct.categoryId}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      categoryId: e.target.value,
                    })
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
                <select
                  required
                  value={editProduct.subcategoryId}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      subcategoryId: e.target.value,
                    })
                  }
                  disabled={!editProduct.categoryId} // Disable subcategory select if category not selected
                >
                  <option value="">Select Subcategory</option>
                  {subcategories
                    .filter((sub) => sub.categoryId === editProduct.categoryId)
                    .map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                </select>
                <div className={styles.label}>Subcategory</div>
              </div>
              <div className={styles.entryarea}>
                <input type="file" onChange={handleEditImageChange} />
                <div className={styles.label}>Image</div>
                {editProduct.imagePreview && (
                  <img
                    src={editProduct.imagePreview}
                    alt="Image Preview"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </div>
              <div className={styles.actions}>
                <button onClick={closeEditModal}>Cancel</button>
                <button onClick={handleEditSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
