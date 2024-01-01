import ActionList from "../ActionList/ActionList";
import AlgoList from "../AlgoList/AlgoList";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-gray-800 p-3">
      {/* actions list */}
      <ActionList />

      {/* algos list */}
      <AlgoList />
    </div>
  );
};

export default Navbar;
