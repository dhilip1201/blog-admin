import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import TextArea from "../../components/UI/TextArea";
import { addBlog, deleteBlogById } from "../../actions/blog.actions";
/**
 * @author
 * @function Blogs
 **/

const Blogs = (props) => {
  const blog = useSelector((state) => state.blog);
  console.log(blog)
  const dispatch = useDispatch();
  
  
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [blogCategory, setBlogCategory] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogText, setBlogText] = useState("");
  const [deleteBlogModal, setDeleteBlogModal] = useState(false);
  

  const [blogDetails, setBlogDetails] = useState(null);
  const handleShow = () => {
    setShow(true);
  };
  const handleShow1 = (blog) => {
    setBlogDetails(blog);
    setShow1(true);
    console.log(blog);
  };
  const handleClose1 = () => {
    setShow1(false);
  };

  const handleClose = () => {
    const form = new FormData();
    form.append("blogCategory", blogCategory);
    form.append("blogTitle", blogTitle);
    form.append("blogText", blogText);
    form.append("blogImage", blogImage);
    
    console.log(form)
    console.log(blogCategory,blogTitle,blogText,blogImage);
    dispatch(addBlog(form));

    setBlogCategory("");
    setBlogTitle("");
    setBlogText("");
    setBlogImage("");
    setShow(false);
  };


  const handleBlogImage = (e) => {
    setBlogImage(e.target.files[0]);
  };

  const renderBlogDetailsModal = () => {
    if (!blogDetails) {
      return null;
    }
    return (
      <Modal
        modalTitle="BlogDetails"
        show={show1}
        handleClose={() => setShow1(false)}
        onSubmit={handleClose1}
        size="lg"
      >
        <Row>
          <Col style={{ display: "flex" }}>
            <div className="productImgContainer">
              <img src={blogDetails.blogImage} />
            </div>
          </Col>
          <Col md={12}>
            <h2>{blogDetails.blogTitle}</h2>
            <h6>{blogDetails.blogCategory}</h6>
          </Col>

          <Col md={12}>
            <div className="div_style_row">
              <p className="value">{blogDetails.blogText}</p>
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };

  const renderAddBlogModal = () => {
    return (
      <Modal
        modalTitle="Add New Blog"
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
      >
        <Input
          label="Blog Category"
          value={blogCategory}
          onChange={(e) => setBlogCategory(e.target.value)}
          placeholder="Blog Category Name"
        />
        <Input
          label="Blog Title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          placeholder="Blog Title"
        />
        <TextArea
          label="Text"
          value={blogText}
          onChange={(e) => setBlogText(e.target.value)}
          placeholder="Blog Text"
        />
        
        <Input
          label="Blog Image"
          name={blogImage}
          onChange={handleBlogImage}
          type="file"
        />
      </Modal>
    );
  };

  const renderBlogs = () => {
    return (
      <Table responsive="sm" style={{ fontSize: "12px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Title</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blog.blogs.length > 0
            ? blog.blogs.map((blog, index) => (
                <tr key={index}>
                  <td>1</td>
                  <td>{blog.blogCategory}</td>
                  <td>{blog.blogTitle}</td>
                  <td>
                    <div>
                      <img
                        style={{ width: "100px", height: "75px" }}
                        src={blog.blogImage}
                        alt={blog.blogImage}
                      />
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <button onClick={() => handleShow1(blog)}>Info</button>
                      {/* <button onClick={() => {deleteBlog}}>delete</button> */}
                      <button
                      onClick={() => {
                        const payload = {
                          blogId: blog._id,
                        };
                        dispatch(deleteBlogById(payload));
                      }}
                    >
                      delete
                    </button>
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };


  // const deleteBlog =()=>{
  //   setDeleteBlogModal(true);
    
  // }
  // const renderDeleteBlogsModal=()=>{
  //   return (
  //     <Modal
  //     modalTitle="Delete Blogs"
  //     handleClose={() => setDeleteBlogModal(false)}
  //     show={deleteBlogModal}
  //     buttons={[
  //       {
  //         label:'No',
  //         color:'success',
  //         onClick:()=>{
  //           alert('no');
  //         }
  //       },
  //       {
  //         label:'Yes',
  //         color:'danger',
  //         onClick:deleteBlogs
  //       }
  //     ]}
  //     >
        
  //     </Modal>
  //   )
  // }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Our Blogs</h3>
              <button onClick={() => handleShow()}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderBlogs()}</Col>
        </Row>
      </Container>
      {renderBlogDetailsModal()}
      {renderAddBlogModal()}
      {/* {renderDeleteBlogsModal()} */}
    </Layout>
  );
};

export default Blogs;
