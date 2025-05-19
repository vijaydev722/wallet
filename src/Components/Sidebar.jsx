import React, { useState } from 'react'
import ToggleButton from './ToggleButton'
import { useDispatch, useSelector } from 'react-redux';
import { setSeachedWalletAddress } from '../reducers/wallet-reducer';

const Sidebar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [addWallet, setAddWallet] = useState('');
  const [activeTab, setActiveTab] = useState('')
  const {value:{inflow, outflow}, theme} = useSelector(state => state.wallet);
  const dispatch = useDispatch()
  const onSearch = () => {  dispatch(setSeachedWalletAddress(searchValue))  }

  return (
    <div className='primary-border-right sidebar' style={{ padding:8, backgroundColor: `${theme === 'light'? '#e3e6f2' : 'transparent'}`}}>
      <div style={{alignSelf:'end', padding: 8}}>
        <ToggleButton/>
      </div>
        <div className='row-flex items-center justify-between primary-border-bottom' style={{paddingBottom: 12}}>
          <input style={{flexGrow:1}} type='text' value={addWallet} aria-label='Add' placeholder='Add Wallet Address' onChange={(e)=>setAddWallet(e.target.value)}/>
          <button>Add</button>
        </div>
        <div className='row-flex items-center justify-around border-bottom'>
          <div className={activeTab === 'inflow' && 'primary-border-bottom'}  style={{padding:8, cursor:'pointer', fontWeight:600}} onClick={()=>setActiveTab('inflow')}>Inflow</div>
          <div className={activeTab === 'outflow' && 'primary-border-bottom'} style={{padding:8, cursor:'pointer', fontWeight:600}}  onClick={()=>setActiveTab('outflow')}>Outflow</div>
        </div>
        <div style={{padding: '8px 2px'}}>
        <div className='row-flex items-center justify-between'>
          <input style={{flexGrow:1}} type='text' value={searchValue} aria-label='Add' placeholder='Search Wallet Address' onChange={(e)=>setSearchValue(e.target.value)}/>
          <button onClick={onSearch}>Search</button>
        </div>
          {activeTab === 'inflow' ? inflow.map((obj)=>{
            return (
              <div style={{fontSize:12, padding:'4px 12px', cursor:'pointer'}}> {`${obj.entity_name} ${obj.amount} ${obj.token_type}`} </div>
            )
          }): activeTab === 'outflow' ?
          outflow.map((obj)=>{
            return (
              <div style={{fontSize:12, padding:'4px 12px', cursor:'pointer'}}> {`${obj.entity_name} ${obj.amount} ${obj.token_type}`} </div>
            )
          }) : <></>
        }
        </div>
    </div>
  )
}

export default Sidebar