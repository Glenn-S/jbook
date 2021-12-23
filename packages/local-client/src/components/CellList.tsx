import './cell-list.css';
import React, { useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AddCell from './AddCell';
import CellListItem from './CellListItem';
import { useActions } from '../hooks/useActions';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data }}) => order.map(id => data[id]));
  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map(cell => {
    return (
      <React.Fragment key={cell.id} >
        <CellListItem cell={cell} />
        <AddCell prevCellId={cell.id} />
      </React.Fragment>
    );
  });

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  )
};

export default CellList;