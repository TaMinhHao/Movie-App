import React from "react";
import "./footer.scss";

import { Link } from "react-router-dom";
import bg from "../../assets/footer-bg.jpg";
import logo from "../../assets/tmovie.png";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
            <img src={logo} alt="" />
            <Link to="/">tMovie</Link>
          </div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Trang chủ</Link>
            <Link to="/">Liên Hệ</Link>
            <Link to="/">Điều khoản dịch vụ</Link>
            <Link to="/">Thông tin thêm</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Trực Tiếp</Link>
            <Link to="/">Hỏi Đáp</Link>
            <Link to="/">Chất Lượng Cao</Link>
            <Link to="/">Chính sách bảo mật</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Bạn Nên Xem</Link>
            <Link to="/">Phát Hành Mới</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
