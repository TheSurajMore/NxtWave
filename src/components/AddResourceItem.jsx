import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddResourceItem.css';

const AddResourceItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    icon_url: '',
    link: '',
    description: '',
    category: '',
    tag: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!formData.title.trim()) formErrors.title = 'Title is required';
    if (formData.title.length > 30) formErrors.title = 'Title cannot exceed 30 characters';
    if (!formData.icon_url.trim() || !isValidURL(formData.icon_url)) formErrors.icon_url = 'Valid icon URL is required';
    if (!formData.link.trim() || !isValidURL(formData.link)) formErrors.link = 'Valid link is required';
    if (!formData.description.trim()) formErrors.description = 'Description is required';
    if (!formData.category.trim()) formErrors.category = 'Category is required';
    if (formData.category.length > 20) formErrors.category = 'Category cannot exceed 20 characters';
    if (!formData.tag.trim()) formErrors.tag = 'Tag is required';
    if (formData.tag.length > 20) formErrors.tag = 'Tag cannot exceed 20 characters';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const isValidURL = (string) => {
    const res = string.match(/(http|https):\/\/(\w+:?\w*@)?(\S+)(:([0-9]+))?\/|\/([\w#!:.?+=&%@!\-\/])/);
    return res !== null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const requestPayload = {
        title: formData.title,
        icon_url: formData.icon_url,
        link: formData.link,
        description: formData.description,
        category: formData.category,
        tag: formData.tag,
      };

      fetch('https://media-content.ccbp.in/website/react-assignment/add_resource.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      })
        .then((response) => {
          if (response.ok) {
            toast.success('Resource item created successfully!', {
              position: "bottom-center",
            });
            setFormData({
              title: '',
              icon_url: '',
              link: '',
              description: '',
              category: '',
              tag: '',
            });
          } else if (response.status === 400) {
            toast.error('Bad request. Please check your input.', {
              position: "bottom-center",
            });
          } else if (response.status === 500) {
            toast.error('Server error. Please try again later.', {
              position: "bottom-center",
            });
          } else {
            toast.error('Failed to create resource item. Please try again.', {
              position: "bottom-center",
            });
          }
        })
        .catch(() => {
          toast.error('An error occurred. Please try again.', {
            position: "bottom-center",
          });
        });
    } else {
      toast.error('Please fill out all fields correctly.', {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="add-resource-container">
      <h2>Add Resource Item</h2>
      <div className="form-image-container">
        <form className="add-resource-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={30}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label>Icon URL</label>
            <input
              type="text"
              name="icon_url"
              value={formData.icon_url}
              onChange={handleChange}
            />
            {errors.icon_url && <span className="error">{errors.icon_url}</span>}
          </div>
          <div className="form-group">
            <label>Link</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
            {errors.link && <span className="error">{errors.link}</span>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              maxLength={20}
            />
            {errors.category && <span className="error">{errors.category}</span>}
          </div>
          <div className="form-group">
            <label>Tag</label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              maxLength={20}
            />
            {errors.tag && <span className="error">{errors.tag}</span>}
          </div>
          <button type="submit">Create</button>
        </form>
        <div className="form-image">
          <img src="https://s3-alpha-sig.figma.com/img/4451/ed3a/155011c955cbce9bdc9f5a65f80e1282?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k5brOWYqJrDrefRdLPD0D2VSj7ZPD3q2kxQTh8uzi7msFm~DujQmf0d7K9F~xEy0lohmJ3f4knG6vxcISsWG5UhigS9xN1YRoWmBw3USL1GBm6urLG3lq1F9XGnu21-xmVffpWUMsVo2NR~YQ8uP~Gf6MaU7wsMXo5WgjLP09VKLWeTjYpA95UgIikrfYke-u99NqpTjgOOiaDfDz-MyKROuvygNrBuLISyXMN6ozvsyLbpHjFxY-Dfvla5v6sWgawqCjQJAzuSW5FAw3FhmMpG7YktS17nsy3~lJQV~F8g4HM4abEH3xCu8~Q4rdbuG6DAwtIFkOHiFI9kAW2to7g__" alt="Form Visual" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddResourceItem;
