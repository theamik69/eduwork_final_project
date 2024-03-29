import Category from "../components/Category";
import Price from "../components/Price";
import Colors from "../components/Colors";
import PropTypes from "prop-types";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        <Category handleChange={handleChange} />
        <Price handleChange={handleChange} />
        <Colors handleChange={handleChange} />
      </section>
    </>
  );
};

Sidebar.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Sidebar;
