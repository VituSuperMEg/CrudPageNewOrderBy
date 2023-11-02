import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Grid(props) {
  const [activeArrow, setActiveArrow] = useState(null);

  const handleOrderBy = (direction, label) => {
    if (activeArrow === label + direction) {
      setActiveArrow(null);
    } else {
      setActiveArrow(label + direction);
    }
    props.orderBy(direction, label);
  };

  useEffect(() => {
    if (props.pagination !== null && props.pagination !== undefined) {
      setActiveArrow(null);
    }
  }, [props.pagination]);

  return (
    <Table table striped hover className="mt-5">
      <thead>
        <tr>
          {props.fields.map((item) => (
            <th
              style={{
                fontFamily: 'Montserrat, "Helvetica Neue", Arial, sans-serif',
                fontWeight: "700",
                size: "13px",
                color: "#858585",
                textAlign: item.debug ? "right" : "",
                width: item.alignment ? "3px" :
                item.label === 'Funcionário' ?  '350px':
                item.label === 'Cargo'? '250px' :
                item.label === 'Descrição' ? '610px' :
                item.label === 'Status Batida' ? '150px' :
                "auto",
              }}
            >
              {item.orderBy ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width:
                      item.label === "Data"
                        ? 100
                        : 200,
                  }}
                >
                  {item.label}
                  &nbsp;
                  <FaArrowUp
                    size={15}
                    className="clicked"
                    color={
                      activeArrow === item.label + "desc" ? "#858585" : "#ccc"
                    }
                    onClick={() => handleOrderBy("desc", item.label)}
                  />
                  <FaArrowDown
                    size={15}
                    className="clicked"
                    color={
                      activeArrow === item.label + "asc" ? "#858585" : "#ccc"
                    }
                    onClick={() => handleOrderBy("asc", item.label)}
                  />
                </div>
              ) : (
                item.label
              )}
            </th>
          ))}
          {props.enableBtnActions && (
            <th
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: 0,
                fontFamily: 'Montserrat, "Helvetica Neue", Arial, sans-serif',
                fontWeight: "700",
                size: "13px",
                color: "#858585",
              }}
            >
              Ações
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {props.list &&
          props.list.map((item, idx) => (
            <tr
              key={idx}
              style={{
                height: 50,
              }}
            >
              {props.fields.map((i) => (
                <td
                  className={i.classBody || ""}
                  style={{
                    maxWidth: "660px",
                    // overflow: "hidden",
                    // textOverflow: "ellipsis",
                    flexWrap : "wrap"
                  }}
                >
                  <a
                    href
                    onClick={() => {
                      if (props.enableBtnEdit) {
                        props.handleEdit(item);
                      } else {
                        if (item.pode_alterar) {
                          if (item.pode_alterar == "true") {
                            props.handleEdit(item);
                          }
                        }
                      }
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          'Montserrat, "Helvetica Neue", Arial, sans-serif',
                        fontWeight: 400,
                        fontSize: 13,
                        color: "#666666",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: item[i.name] ? item[i.name] : "-",
                      }}
                    />
                  </a>
                </td>
              ))}
              {props.enableBtnActions && (
                <td style={{ float: "right" }}>
                  {props.enableBtnEdit && !item.status_registro && (
                    <button
                      type="button"
                      data-toggle="tooltip"
                      title=""
                      className="btn btn-primary btn-sm mr-2 btn-grid-edit mt-2"
                      data-original-title="Edit Task"
                      onClick={() => props.handleEdit(item)}
                    >
                      <i className="la la-edit" />
                    </button>
                  )}
                  {props.enableBtnEdit && item.status_registro && (
                    <button
                      type="button"
                      data-toggle="tooltip"
                      title=""
                      className="btn btn-primary btn-sm mr-2 btn-grid-edit"
                      data-original-title="Edit Task"
                      onClick={() => {
                        if (item.status_registro == "A") {
                          props.handleEdit(item);
                        } else {
                          props.handleActive(item);
                        }
                      }}
                    >
                      {item.status_registro == "A" ? (
                        <i className="la la-edit" />
                      ) : (
                        <i className="la la-check" />
                      )}
                    </button>
                  )}
                  {!props.enableBtnEdit &&
                    item.pode_alterar &&
                    item.pode_alterar == "true" && (
                      <button
                        type="button"
                        data-toggle="tooltip"
                        title=""
                        className="btn btn-primary btn-sm mr-2 btn-grid-edit"
                        data-original-title="Edit Task"
                        onClick={() => props.handleEdit(item)}
                      >
                        <i className="la la-edit" />
                      </button>
                    )}
                  {props.enableBtnDelete && <>&nbsp;</>}
                  {props.enableBtnDelete && !item.status_registro && (
                    <button
                      type="button"
                      data-toggle="tooltip"
                      title=""
                      className="btn btn-danger btn-sm mr-2 btn-grid-delete"
                      data-original-title="Remove"
                      onClick={() => props.handleDelete(item)}
                    >
                      <i className="la la-times" />
                    </button>
                  )}
                  {props.enableBtnDelete && item.status_registro && (
                    <button
                      type="button"
                      data-toggle="tooltip"
                      title=""
                      className="btn btn-danger btn-sm mr-2 btn-grid-delete"
                      data-original-title="Remove"
                      onClick={() => props.handleDelete(item)}
                    >
                      {item.status_registro == "A" ? (
                        <i className="la la-times" />
                      ) : (
                        <i className="la la-trash" />
                      )}
                    </button>
                  )}
                  {!props.enableBtnDelete &&
                    item.pode_alterar &&
                    item.pode_alterar == "true" && (
                      <button
                        type="button"
                        data-toggle="tooltip"
                        title=""
                        className="btn btn-danger btn-sm mr-2 btn-grid-delete"
                        data-original-title="Remove"
                        onClick={() => props.handleDelete(item)}
                      >
                        <i className="la la-times" />
                      </button>
                    )}
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

Grid.defaultProps = {
  list: [],
  fields: [],
  handleEdit: null,
  handleDelete: null,
  enableBtnEdit: true,
  enableBtnDelete: true,
  enableBtnActions: true,
};
