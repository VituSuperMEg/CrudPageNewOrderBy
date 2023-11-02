import React, { useEffect, useState } from "react";
import { SearchButton, ButtonIcon } from "./styles";
import { FaTag } from "react-icons/fa";

export default function InputSearch(props) {
  const [searchValue, setSearchValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleSearch = () => {
    setTags((prevState) => [...prevState, searchValue]);

    setSearchValue("");
  };
  async function removeTagName(tagName) {
    setTags((prevState) =>
      prevState.filter((tag) => tag !== tagName && tag !== "")
    );
    setSearchValue("");
    const nameTag = String(tags.filter((tag) => tag !== tagName && tag !== ""));
    await props.handleText(nameTag);
  }
  useEffect(() => {
    const tagsString = tags.join(",");
    props.handleText(tagsString);
  }, [tags, props]);

  return (
    <>
      <div
        className="input-group input-group-sm"
        style={{ width: "100" }}
      >
        <input
          className="form-control"
          placeholder="Pesquisar..."
          value={searchValue}
          type={props.searchMask === "data" ? "date" : "text"}
          onChange={(e) => {
            // props.handleText(e.target.value);
            setSearchValue(e.target.value);
          }}
        />
        <div className="input-group-append">
          <SearchButton onClick={handleSearch}>
            <ButtonIcon icon="flaticon-search-1" />
          </SearchButton>
        </div>
      </div>
      {tags.length > 0 ? (
        <div className="tag-content">
          {tags.map((tag) =>
            tag !== "" ? (
              <div className="tag">
                <FaTag />
                {tag}
                <button
                  onClick={() => {
                    removeTagName(tag);
                  }}
                >
                  X
                </button>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
