import {defineStore} from 'pinia'
import api from '../api.js';
export const useStaffStore = defineStore('staff', {
    state : ()=> ({
        staffList: [],
        sortKey:'',
        sortAsc : true}),

    actions: {
       async fetchStaff() {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/admin/staff',{
          headers:{
            Authorization : `Bearer ${token}`
          }
        });
        console.log('Fetched staff:', response.data.staff);
        this.staffList = response.data.staff.map(staff => ({
          id: staff.staffId,
          name: staff.staffName,
          department: staff.department,
          editing: false
        }));
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      }
    },
    
        addStaff(staff) {
            this.staffList.push({...staff,editing:false});
        },
        updateStaff(index,updatedStaff) {
           this.staffList[index] = {...updatedStaff,editing:false};
        },
        deleteStaff(index) {
            this.staffList.splice(index, 1);
        },
        setSort(key,direction) {
            this.sortKey=key;
            this.sortAsc=direction=== 'asc';
    }
},
getters:{
    sortedStaffList(state) {
      if (!state.sortKey) return state.staffList;

      return [...state.staffList].sort((a, b) => {
        const valA = a[state.sortKey] ?? '';
        const valB = b[state.sortKey] ?? '';

        const isNumber = !isNaN(Number(valA)) && !isNaN(Number(valB));

        if (isNumber) {
          return state.sortAsc ? valA - valB : valB - valA;
        }

        return state.sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }
  },
  // persist:{
  //   Storage: localStorage,
  //   paths: ['staffList']
  // }
}
);