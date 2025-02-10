import React from "react";
import IconButton from "../../../../components/cvBuilder/sidebar/SaveBlock/Controls/IconButton";
import { SidebarBookmarkButtonsProps } from "../../../../types/cv-builder/sidebar/SidebarInterface";
import { FaTimes, FaBookmark, FaRegBookmark } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const BookmarkButtonBar: React.FC<SidebarBookmarkButtonsProps> = ({
  isBookmarked,
  onClear,
  onAdd,
  onRemove,
}) => {
  const handleClear = () => {
    // Hier kannst du ggf. auch einen Swal-Dialog einbauen, falls gewünscht
    onClear();
  };

  const handleAdd = async () => {
    const result = await MySwal.fire({
      title: "Add to Bookmarks?",
      text: "Do you want to add this block to bookmarks?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      onAdd();
      MySwal.fire(
        "Added!",
        "The block has been added to bookmarks.",
        "success"
      );
    }
  };

  const handleRemove = async () => {
    const result = await MySwal.fire({
      title: "Remove from Bookmarks?",
      text: "Do you want to remove this block from bookmarks?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      onRemove();
      MySwal.fire(
        "Removed!",
        "The block has been removed from bookmarks.",
        "success"
      );
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Button zum Clearen des Texts */}
      <IconButton onClick={handleClear} title="Clear text">
        <FaTimes />
      </IconButton>

      {/* Button zum Hinzufügen zu den Bookmarks */}
      <IconButton onClick={handleAdd} title="Add to bookmarks">
        <FaBookmark />
      </IconButton>

      {/* Button zum Entfernen aus den Bookmarks – nur klickbar, wenn isBookmarked === true */}
      <IconButton
        onClick={handleRemove}
        disabled={!isBookmarked}
        title="Remove from bookmarks"
      >
        <FaRegBookmark />
      </IconButton>
    </div>
  );
};

export default BookmarkButtonBar;
