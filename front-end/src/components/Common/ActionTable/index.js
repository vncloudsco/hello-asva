import React from 'react';
import { NavLink } from 'react-router-dom'
import { Icon } from 'antd';

export function Edit({ router }) {
    return (
        <NavLink to={router}><Icon type="edit" className="table-edit"></Icon></NavLink>
    )
}

export function EditModal({ onUpdate }) {
    return (
        <a href="#" onClick={(event) => { event.preventDefault(); onUpdate() }}><Icon type="edit" className="table-edit"></Icon></a>
    )
}

export function ModalListComment({ listComment }) {
    return (
        <a href="#" onClick={(event) => { event.preventDefault(); listComment() }}><Icon type="message" className="table-edit"></Icon></a>
    )
}

export function ModalOpen({ onOpen }) {
    return (
        <a href="#" onClick={(event) => { event.preventDefault(); onOpen() }}><Icon type="message" className="table-edit"></Icon></a>
    )
}

export function Detail({ router }) {
    return (
        <NavLink to={router}><Icon type="book" className="table-edit"></Icon></NavLink>
    )
}

export function ModalDetail({ onDetail }) {
    return (
        <a href="#" onClick={(event) => { event.preventDefault(); onDetail() }}><Icon type="read" className="table-edit"></Icon></a>
    )
}

export function ModalTransferCredit({ onTransferCredit }) {
    return (
        <a href="#" onClick={(event) => { event.preventDefault(); onTransferCredit() }}><Icon type="dollar" className="table-edit"></Icon></a>
    )
}

export function ModalHistoryTransferCredit({ onHistoryTransferCredit }) {
    return (
        <a href="#" onClick={(event) => { event.preventDefault(); onHistoryTransferCredit() }}><Icon type="database" className="table-edit"></Icon></a>
    )
}

export { default as Delete } from './Delete';