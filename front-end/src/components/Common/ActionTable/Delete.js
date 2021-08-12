import React from "react";
import { Icon, Popconfirm, message, Button } from 'antd';
import { injectIntl } from "react-intl";
import CallApi from '../../../api';
import _ from 'lodash';

class Delete extends React.Component {
    confirm = () => {
        let { intl, id, food_id, menu_id, api2, store_catalogue_id, tourist_attraction_id, handleChange, nameList, nameList1, regionItemStatusOriginal, areaItemStatusOriginal, nameList2, paginationInfo, listData, listData1, listData2, idx, api } = this.props;
        if (api == "deleteArea") {
            CallApi[api]({ id }).then((res) => {
                if (res.code) {


                    message.success(intl.formatMessage({ id: "notify.delete.success" }));
                    handleChange("region_id", null)
                    if (listData1 && nameList1 && areaItemStatusOriginal == true) {
                        if (!idx) {
                            idx = _.findIndex(listData1, function (o) { return o.id == id; });
                        }

                        listData1.splice(idx, 1);
                        handleChange(nameList1, listData1);
                        handleChange(nameList2, listData2);
                    }
                    if (listData2 && nameList2 && areaItemStatusOriginal == false) {
                        if (!idx) {
                            idx = _.findIndex(listData2, function (o) { return o.id == id; });
                        }

                        listData2.splice(idx, 1);
                        handleChange(nameList2, listData2);
                        handleChange(nameList1, listData1);
                    }
                    handleChange("modal_area", false);

                    if (paginationInfo && paginationInfo.total) {
                        paginationInfo.total = paginationInfo.total - 1;
                        handleChange("paginationInfo", paginationInfo);
                    }
                } else {
                    message.error(res)
                }
            })
        }

        else if (api == "deleteRegion") {
            CallApi[api]({ id }).then((res) => {
                if (res.code) {

                    handleChange("region_id", null)
                    message.success(intl.formatMessage({ id: "notify.delete.success" }));
                    if (listData1 && nameList1 && regionItemStatusOriginal == true) {
                        if (!idx) {
                            idx = _.findIndex(listData1, function (o) { return o.id == id; });
                        }

                        listData1.splice(idx, 1);
                        handleChange(nameList1, listData1);
                        handleChange(nameList2, listData2);
                    }
                    if (listData2 && nameList2 && regionItemStatusOriginal == false) {
                        if (!idx) {
                            idx = _.findIndex(listData2, function (o) { return o.id == id; });
                        }

                        listData2.splice(idx, 1);
                        handleChange(nameList2, listData2);
                        handleChange(nameList1, listData1);
                    }
                    handleChange("modal_region", false);

                    if (paginationInfo && paginationInfo.total) {
                        paginationInfo.total = paginationInfo.total - 1;
                        handleChange("paginationInfo", paginationInfo);
                    }
                } else {
                    message.error(res)
                }
            })
        }

        else if (api == "deleteTicket" && api2 == 'deleteTicketOfTourist') {
            CallApi[api]({ id, menu_id }).then((res) => {
                if (res.code) {
                    if (!idx) {
                        idx = _.findIndex(listData, function (o) { return o.ticket_id == id && o.tourist_attraction_id == tourist_attraction_id });
                    }

                    listData.splice(idx, 1);

                    message.success(intl.formatMessage({ id: "notify.delete.success" }));

                    handleChange(nameList, listData);
                    if (paginationInfo && paginationInfo.total) {
                        paginationInfo.total = paginationInfo.total - 1;
                        handleChange("paginationInfo", paginationInfo);
                    }
                } else {
                    message.error(res)
                }
            })
        }
        else if (api == "deleteFoodOfMenu") {
            CallApi[api]({ id, menu_id }).then((res) => {
                if (res.code) {
                    if (!idx) {
                        idx = _.findIndex(listData, function (o) { return o.food_id == id && o.menu_id == menu_id });
                    }

                    listData.splice(idx, 1);

                    message.success(intl.formatMessage({ id: "notify.delete.success" }));

                    handleChange(nameList, listData);
                    if (paginationInfo && paginationInfo.total) {
                        paginationInfo.total = paginationInfo.total - 1;
                        handleChange("paginationInfo", paginationInfo);
                    }
                } else {
                    message.error(res)
                }
            })
        }

        else if (api == "deleteStoreCatalogueItemOfMenu") {
            CallApi[api]({ id, store_catalogue_id }).then((res) => {
                if (res.code) {
                    if (!idx) {
                        idx = _.findIndex(listData, function (o) { return o.store_catalogue_item_id == id && o.store_catalogue_id == store_catalogue_id });
                    }

                    listData.splice(idx, 1);

                    message.success(intl.formatMessage({ id: "notify.delete.success" }));

                    handleChange(nameList, listData);
                    if (paginationInfo && paginationInfo.total) {
                        paginationInfo.total = paginationInfo.total - 1;
                        handleChange("paginationInfo", paginationInfo);
                    }
                } else {
                    message.error(res)
                }
            })
        }


        else {
            CallApi[api]({ id }).then((res) => {
                if (res.code) {
                    if (!idx) {
                        idx = _.findIndex(listData, function (o) { return o.id == id; });
                    }

                    listData.splice(idx, 1);

                    message.success(intl.formatMessage({ id: "notify.delete.success" }));

                    handleChange(nameList, listData);
                    if (paginationInfo && paginationInfo.total) {
                        paginationInfo.total = paginationInfo.total - 1;
                        handleChange("paginationInfo", paginationInfo);
                    }
                } else {
                    message.error(res)
                }
            })
        }

    }

    render() {
        let { intl, api } = this.props;
        if (api == "deleteArea" || api == "deleteRegion") {

            return (
                <Popconfirm
                    placement="topRight"
                    title="Xác nhận xóa"
                    onConfirm={this.confirm}
                    okText="Xóa"
                    cancelText="Hủy"
                >
                    <a href="#"> <Button type="delete" className="table-delete">Xóa</Button></a>
                </Popconfirm>

            )
        } else {
            return (
                <Popconfirm
                    placement="topRight"
                    title="Xác nhận xóa"
                    onConfirm={this.confirm}
                    okText="Xóa"
                    cancelText="Hủy"
                >
                    <a href="#"> <Icon type="delete" className="table-delete"></Icon></a>
                </Popconfirm>

            );
        }
    }
}

export default injectIntl(Delete);
