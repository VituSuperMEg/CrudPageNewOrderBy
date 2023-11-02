import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import Pagination from "../Pagination";
import Form from "../Form";
import Grid from "../Grid";
import InputSearch from "../Helpers/InputSearch";
import Content from "../Content";
import Message from "~/core/Message";
import { getDataParams, submit } from "~/services/api";
import { checkPermission } from "~/components/Services/Permission";
import PubSub from "pubsub-js";

export default function Crud(props) {
  const [view, setView] = useState("list");
  const [data, setData] = useState(props.emptyObject);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [paramsSearch, setParamsSerach] = useState(props.paramsSearch);
  const [visibleBtns, setVisibleBtns] = useState(true);

  async function handleSubmit(values, objects) {
    PubSub.publish("loading", true);
    if (values.id) {
      await submit(props.endPoint, "put", `update`, values);
    } else {
      await submit(props.endPoint, "post", "create", values);
    }
    PubSub.publish("loading", false);
    loadData();
    setView("list");
  }

  async function handleActive(item) {
    if (!checkPermission(props.endPoint, "save")) {
      Message.info("Você não tem permissão para Cadastrar um novo Registro!");
      return false;
    }
    const response = await getDataParams(props.endPoint, `show`, {
      params: {
        id: item.id,
      },
    });
    PubSub.publish("loading", true);
    await submit(props.endPoint, "post", "create", response);
    PubSub.publish("loading", false);
    loadData();
    setView("list");
  }

  function handleNew() {
    if (!checkPermission(props.endPoint, "save")) {
      Message.info("Você não tem permissão para Cadastrar um novo Registro!");
      return false;
    }
    setData(props.emptyObject);
    setView("new");
  }

  async function handleEdit(item) {
    if (!checkPermission(props.endPoint, "edit")) {
      Message.info("Você não tem permissão para Editar este Registro!");
      return false;
    }
    const response = await getDataParams(props.endPoint, `show`, {
      params: {
        id: item.id,
      },
    });
    setData(response);
    setView("edit");
  }

  async function handleDelete(item) {
    if (
      !checkPermission(props.endPoint, "del") &&
      !checkPermission(props.endPoint, "delete")
    ) {
      Message.info("Você não tem permissão para Remover este Registro!");
      return false;
    }
    const check = await Message.confirmation("Deseja deletar este registro?");
    if (check) {
      await submit(props.endPoint, "delete", "remove", {
        params: { id: item.id },
      });
      loadData();
    }
  }

  function handleList(item) {
    loadData();
    setView("list");
  }

  async function getSearch() {
    setPage(1);
    await loadData();
  }

  async function loadData() {
    const response = await getDataParams(props.endPoint, "list", {
      params: {
        page: page,
        descricao: search,
        ...paramsSearch,
      },
    });
    setList(response.data.data);
    setPagination(response.data);
    props.tagName(response.search);
  }
  useEffect(() => {
    loadData();
  }, [page]);

  useEffect(() => {
    getSearch();
  }, [search, paramsSearch]);

  async function handleOrderBy (order, label) {
    const response = await getDataParams(props.endPoint, "list", {
      params: {
        page: page,
        descricao: search,
        label : label,
        order : order,
        ...paramsSearch,
      },
    });
    setList(response.data.data);
    setPagination(response.data);
  }
  return (
    <>
      <Content
        style={{ borderRadius: 5}}
        portal={props.portal}
        breadcrumbs={props.breadcrumbs}
        displayName={props.title}
        {...props}
        view={view}
        onBtnNovoClick={handleNew}
        onBtnSearchClick={handleList}
        btnNew={({ handleNew }) => (
          <div style={{ float: "right", zIndex: '9999'}}>
            <button
              class="btn btn-round ml-auto"
              onClick={() => handleNew()}
              style={{ background: "#08ACCE", color: "#fff" }}
              type="button"
            >
              <i class="la la-plus"></i> Novo
            </button>
          </div>
        )}
        btnSearch={({ handleSearch }) => (
          <div style={{ float: "right"}}>
            <button
              class="btn btn-round ml-auto"
              onClick={() => handleSearch()}
              style={{ background: "#08ACCE", color: "#fff" }}
              type="button"
            >
              <i class="la la-search"></i> Buscar
            </button>
          </div>
        )}
      >
        {view === "list" ? (
          <Row>
            <Col md={6}>
              {props.FormSearch && (
                <props.FormSearch
                  {...props}
                  params={paramsSearch}
                  setParams={setParamsSerach}
                />
              )}
            </Col>
            <Col md={6}>
              {props.inputSearchMarginTop ? (
                <div
                 style={{
                  marginTop : 35,
                 }}
                >
                  <InputSearch
                    value={search}
                    searchMask={props.searchMask.tipo_filtro}
                    handleText={(value) => setSearch(value)}
                  />
                </div>
              ) : (
                <InputSearch
                  value={search}
                  handleText={(value) => setSearch(value)}
                />
              )}
            </Col>
          </Row>
        ) : null}
        {view === "list" && (
          <>
            <Grid
              {...props}
              list={list}
              orderBy={handleOrderBy}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleActive={handleActive}
              pagination={pagination.current_page}
            />
            <Row>
              <Col>
                <br />
                Mostrando {pagination.from || "0"} até {pagination.to || "0"} de{" "}
                {pagination.total || "0"} registros
              </Col>
              <Col>
                <Pagination
                  changePage={(data) => setPage(data.page)}
                  data={pagination}
                />
              </Col>
            </Row>
          </>
        )}
        {view === "new" || view === "edit" ? (
          <Form
            {...props}
            emptyObject={data}
            handleEdit={handleEdit}
            handleNew={handleNew}
            handleSubmit={handleSubmit}
            handleCancel={handleList}
            setVisibleBtns={setVisibleBtns}
            visibleBtns={visibleBtns}
            status={view}
          />
        ) : null}
      </Content>
    </>
  );
}

Crud.defaultProps = {
  FormSearch: null,
  paramsSearch: {},
};
