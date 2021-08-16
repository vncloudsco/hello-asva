import React from "react";
import { Button, Table, Input, Icon, Select, Row, Col, Divider, DatePicker, message } from "antd";
import RequestApi from '../../api';
import { T } from 'util';
import { Delete, ModalListComment, EditModal } from '../../components/Common/ActionTable';
import { injectIntl } from "react-intl";
import { withRouter } from 'react-router';
import CreateAndUpdateRequest from './CreateAndUpdateRequest';
import moment from 'moment';
// import ConvertDatetime from './ConvertDatetime';
import CircularProgress from "components/CircularProgress";

const { Option } = Select;
const dateFormatList = ['DD/MM/YYYY', 'DD-MM-YYYY'];

class SamplePage extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    paginationInfo: {
      total: 0,
      pageSize: 20,
      current: 1
    },
    list_post: [],
    type: "post",
    showModal: false,
    post_id: null,
    loading_page: true
  };

  componentDidMount = () => {
    this.getListRequest();
  }

  getListRequest = () => {
    let { paginationInfo } = this.state;
    RequestApi.getListRequest({ page: paginationInfo.current, size: paginationInfo.pageSize }).then(res => {
      if (res.code == 200) {
        let data = res.data;
        this.setState(state => ({
          paginationInfo: {
            ...state.paginationInfo,
            total: data.count,
          },
          list_post: data.rows,
        }))
      } else {
        this.setState({
          list_post: []
        })
      }
    })
  }

  searchPost = (paramSearch) => {
    RequestApi.getListRequest({ ...paramSearch }).then(res => {
      if (res.code) {
        let data = res.data;
        data.rows = data.rows.map((item, index) => {
          return { ...item, index: ((this.state.paginationInfo.current - 1) * this.state.paginationInfo.pageSize) + (index + 1) }
        })
        this.setState(state => ({
          paginationInfo: {
            ...state.paginationInfo,
            total: data.count,
          },
          list_post: data.rows
        }))
      }
    })
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
    this.getListRequest(value);
  }

  reset = () => {
    this.setState({
      request_id: null,
      showModal: false,
    })
    // this.componentDidMount();
  }

  handleComment = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  updateMenu(id) {
    this.setState({
      request_id: id,
      showModal: true
    })
  }

  tableChange = (pagination, filters, sorter) => {
    let { paginationInfo, type } = this.state;
    let paramSearch = {
      type,
      size: pagination.pageSize,
      page: paginationInfo.current != pagination.current ? pagination.current : 1
    }

    if (filters.title && filters.title[0]) {
      paramSearch = {
        ...paramSearch,
        title: filters.title[0]
      }
    }
    if (filters.publish_date && filters.publish_date[0]) {
      let publishDate = filters.publish_date[0]
      paramSearch = {
        ...paramSearch,
        publish_date: moment(publishDate).format("YYYY-MM-DD")
      }
    }
    if (filters.status && filters.status[0]) {
      paramSearch = {
        ...paramSearch,
        status: filters.status[0]
      }
    }
    if (filters.hot) {
      paramSearch = {
        ...paramSearch,
        hot: filters.hot
      }
    }
    if (filters.person_write && filters.person_write[0]) {
      paramSearch = {
        ...paramSearch,
        person_write: filters.person_write
      }
    }

    if (sorter.columnKey && sorter.order) {
      paramSearch = {
        ...paramSearch,
        [`sort_${sorter.columnKey}`]: sorter.order === "descend" ? "DESC" : "ASC"
      }
    }

    this.searchPost(paramSearch);

    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
      paginationInfo: pagination,
      paramSearch
    });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            <T id="general.search" />
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            <T id="general.reset" />
          </Button>
        </div>
      )
    },
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    )
  });


  render() {
    let { sortedInfo, filteredInfo, list_post, type, paginationInfo, showModal, request_id } = this.state;
    let { intl } = this.props;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    //Danh sách
    const columns = [
      {
        title: 'Mã đặt lịch',
        dataIndex: 'code',
        key: "code",
      },
      {
        title: "Thời gian đặt lịch",
        dataIndex: 'createdAt',
        key: "createdAt",
        width: 100,
        render: createdAt => (
          <span>
            {moment(createdAt).format("DD-MM-YYYY HH:mm")}
          </span>
        ),
      },
      {
        title: "Thời gian xem nhà",
        dataIndex: 'viewAt',
        key: "viewAt",
        width: 100,
        render: viewAt => (
          <span>
            {moment(viewAt).format("DD-MM-YYYY")}
          </span>
        ),
      },
      {
        title: "Loại xem",
        dataIndex: 'type',
        key: "type",
        render: (value, record, index) => {
          switch (value) {
            case 0:
              return <Button size="small" type="warning">Xem trực tiếp</Button>
            // break;
            case 1:
              return <Button size="small" type="success">Xem live video</Button>
            // break;
            case 2:
              return <Button size="small" type="danger">Xem 3D</Button>
            // break;

          }
        }
      },
      {
        title: "Trạng thái hẹn",
        dataIndex: 'status',
        key: "status",
        // filters: [{ text: <T id="formData.post.pending" />, value: "pending" }, { text: <T id="formData.post.accept" />, value: "accept" },
        // { text: <T id="formData.post.delete" />, value: "delete" }, { text: <T id="formData.post.cancel" />, value: "cancel" }],
        render: (value, record, index) => {
          switch (value) {
            case 0:
              return <Button size="small" type="warning">Chờ xác nhận</Button>
            // break;
            case 1:
              return <Button size="small" type="success">Đã xác nhận</Button>
            // break;
            case 2:
              return <Button size="small" type="danger">Đã hoàn thành</Button>
            // break;
            case 3:
              return <Button size="small" type="primary">Đã hủy</Button>
            // break;

          }
        }
      },
      {
        title: "Ghi chú",
        dataIndex: 'note',
        key: "note",
      },
      {
        title: "Người đặt lịch",
        render: (value, record, index) => {
          if (value) {
            return <div>
              <p>{value.senderName}</p><br />
              <p>{value.senderEmail}</p><br />
              <p>{value.senderPhone}</p>
            </div>
          }
        },
      },
      {
        title: "Người đăng tin",
        dataIndex: 'receiveUserId.creator',
        key: "receiveUserId.creator",
        render: (value, record, index) => {
          if (value) {
            return <div>
              <p>{value.name}</p><br />
              <p>{value.email}</p><br />
              <p>{value.phone}</p>
            </div>
          }
        },
      },
      {
        title: "Mã đăng tin",
        dataIndex: 'receiveUserId.code',
        key: "receiveUserId.code",
      },
      {
        title: "Loại tin",
        dataIndex: 'receiveUserId.crawl',
        key: "receiveUserId.crawl",
        // filterMultiple: false,
        // filters: [
        //   { text: <T id="table.actived" />, value: true },
        //   { text: <T id="general.not.actived" />, value: false }
        // ],
        render: (value, record, index) => {
          if (value) {
            return <Button size="small" type="primary">Tin crawl</Button>
          }
          return <Button size="small">Tin tự đăng</Button>
        },
      },
      //Người tạo
      {
        title: "Tiêu đề tin",
        // align: 'center',
        dataIndex: 'receiveUserId.title',
        key: "receiveUserId.title",
        // ...this.getColumnSearchProps('Tìm Tác Giả'),
      },
      {
        title: "Số lần nhắc lịch",
        // align: 'center',
        dataIndex: 'supportCount',
        key: "supportCount",
        // ...this.getColumnSearchProps('Tìm Tác Giả'),
      },
      //Hoạt động
      {
        title: "Thao tác",
        align: 'center',
        render: (value, record, idx) => {
          return <div>
            {/* <ModalListComment listComment={() => { this.listComment(record.id) }} />
            <Divider type="vertical" /> */}
            <EditModal onUpdate={() => { this.updateMenu(record._id) }} />
            <br />
            <Divider type="vertical" />
            < Delete
              api="deleteRequest"
              listData={list_post}
              nameList="list_post"
              paginationInfo={paginationInfo}
              id={record._id}
              handleChange={this.handleComment}
            />
          </div>
        },
      }
    ];
    return (
      <div className="content-wrapper">
        <div className="gx-main-wrapper">
          <div className="gx-main-content-wrapper">
            {/* <Row>

              <Col span={24}>
                <Button
                  icon="plus"
                  className="float-right"
                  type="success"
                  onClick={() => this.createPost()}
                >
                  <T id="formData.add-new" />
                </Button>
              </Col>

            </Row>

            <Button
              type={type === "post" ? "primary" : "default"}
              onClick={() => {
                this.handleChange("type", "post");
              }}
              size="large">
              <T id="formData.post.post" />
            </Button>

            <Button
              type={type === "blog" ? "primary" : "default"}
              size="large"
              onClick={() => {
                this.handleChange("type", "blog")
              }}
            >
              <T id="formData.post.blog" />
            </Button>

            <Divider /> */}
            <div className="gx-main-content main-content">
              <Table
                rowKey={list_post => list_post.id}
                className="gx-table-responsive"
                columns={columns}
                dataSource={list_post}
                onChange={this.tableChange}
                pagination={paginationInfo}
                bordered
              />
            </div>
          </div>
        </div>

        {showModal ?
          <CreateAndUpdateRequest
            showModal={showModal}
            request_id={request_id}
            handleChange={this.handleChange}
            intl={intl}
            reset={this.reset}
          />
          : null
        }
      </div >
    );
  }
}

export default withRouter(injectIntl(SamplePage));

