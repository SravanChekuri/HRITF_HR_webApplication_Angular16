import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownValuesService {

constructor() { }

private reasonsMap: { [key: string]: { value: string; label: string }[] } = {
  AddAssignment: [
    {
      value: 'createdContractAppointment',
      label: 'Created Contract Appointment',
    },
    { value: 'internalRecruitment', label: 'Internal Recruitment' },
    { value: 'reOrganisation', label: 'Re-organisation' },
  ],
  AssignmentChange: [
    { value: 'AwardTenure', label: 'AwardTenure' },
    {
      value: 'Awardunitofservice-Tenure',
      label: 'Awardunitofservice-Tenure',
    },
    { value: 'CareerProgression', label: 'CareerProgression' },
    { value: 'ContractRenewal', label: 'ContractRenewal' },
    { value: 'LeaveofAbsence', label: 'LeaveofAbsence' },
    {
      value: 'LeaveofAbsence-Sabbatical',
      label: 'LeaveofAbsence-Sabbatical',
    },
    { value: 'LeaveofAbsence-unpaid', label: 'LeaveofAbsence-unpaid' },
    { value: 'ProjectAssignment', label: 'ProjectAssignment' },
    { value: 'Reorganization', label: 'Reorganization' },
    { value: 'ReturnfromLOA', label: 'ReturnfromLOA' },
    { value: 'ReturnfromLOASabbatical', label: 'ReturnfromLOASabbatical' },
  ],
  Demotion: [
    { value: 'Performance', label: 'Performance' },
    { value: 'Reorganization', label: 'Reorganization' },
    { value: 'WorkerRequest', label: 'WorkerRequest' },
  ],
  EndAssignment: [
    { value: 'EndProbation', label: 'EndProbation' },
    { value: 'ManagerRequest', label: 'ManagerRequest' },
    { value: 'PlannedEnd', label: 'PlannedEnd' },
    { value: 'WorkerRequest', label: 'WorkerRequest' },
  ],
  EndProbationPeriod: [
    { value: 'EndProbation', label: 'EndProbation' },
    { value: 'Performance', label: 'Performance' },
  ],
  ExtendTemporaryAssignment: [
    { value: 'ManagerRequest', label: 'Manager Request' },
    { value: 'PeriodicReview', label: 'Periodic Review' },
    { value: 'Reorganization', label: 'Re-organization' },
  ],

  GlobalTemporaryAssignment: [
    { value: 'CareerProgression', label: 'Career Progression' },
    { value: 'ManagerRequest', label: 'Manager Request' },
    { value: 'Probation', label: 'Probation' },
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'StaffingShortage', label: 'Staffing Shortage' },
    { value: 'WorkerRequest', label: 'Worker Request' },
  ],
  GlobalTransfer: [
    { value: 'CareerProgression', label: 'Career Progression' },
    { value: 'InternalRecruitment', label: 'Internal Recruitment' },
    { value: 'LocationChange', label: 'Location Change' },
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'WorkerRequest', label: 'Worker Request' },
  ],
  JobLocationchange: [
    { value: 'AgreementChange', label: 'Agreement Change' },
  ],
  JobChange: [
    { value: 'Performance', label: 'Performance' },
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'WorkerRequest', label: 'Worker Request' },
  ],
  LocationChange: [
    { value: 'Relocation', label: 'Re-location' },
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'WorkerRequest', label: 'Worker Request' },
  ],
  ManagerChange: [
    {
      value: 'AdditionofAssignmentforManager',
      label: 'Addition of Assignment for Manager',
    },
    {
      value: 'AdditionofContingentWorkRelationshipforManger',
      label: 'Addition of Contingent Work Relationship for Manger',
    },
    {
      value: 'AdditionofEmploymentTermsforManger',
      label: 'Addition of Employment Terms for Manger',
    },
    {
      value: 'AdditionofNonworkerWorkRelationshipforManager',
      label: 'Addition of Non-worker Work Relationship for Manager',
    },
    {
      value: 'AdditionofNonWorkerforManager',
      label: 'Addition of Non-Worker for Manager',
    },
    {
      value: 'AdditionofPendingWorkerforManager',
      label: 'Addition of Pending Worker for Manager',
    },
    {
      value: 'ChangeofLocationofManager',
      label: 'Change of Location of Manager',
    },
    {
      value: 'ChangeofManagerofManager',
      label: 'Change of Manager of Manager',
    },
    {
      value: 'EndofAssignmentforManager',
      label: 'End of Assignment for Manager',
    },
    {
      value: 'EndofEmploymentTermsforManager',
      label: 'End of Employment Terms for Manager',
    },
    {
      value: 'EndofGlobalTemporaryAssignmentforManager',
      label: 'End of Global Temporary Assignment for Manager',
    },
    {
      value: 'EndofTemporaryAssignmentforManager',
      label: 'End of Temporary Assignment for Manager',
    },
    {
      value: 'GlobalTemporaryassignmentforManager',
      label: 'Global Temporary assignment for Manager',
    },
    { value: 'GlobalTransferofManager', label: 'Global Transfer of Manager' },
    { value: 'NewHireofManager', label: 'New Hire of Manager' },
    { value: 'PromotionofManger', label: 'Promotion of Manger' },
    {
      value: 'ReassignmentofManagerReports',
      label: 'Re-assignment of Manager Reports',
    },
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'Resignationofmanager', label: 'Resignation of manager' },
    {
      value: 'TemporaryAssignmentofManager',
      label: 'Temporary Assignment of Manager',
    },
    { value: 'TerminationofManager', label: 'Termination of Manager' },
    { value: 'TransferofManager', label: 'Transfer of Manager' },
  ],
  PositionChange: [
    { value: 'BudgetAdjustment', label: 'Budget Adjustment' },
    { value: 'Performance', label: 'Performance' },
    {
      value: 'PositionDistributionAllocation',
      label: 'Position Distribution Allocation',
    },
    {
      value: 'PositionReclassification',
      label: 'Position Re-classification',
    },
    { value: 'Reorganization', label: 'Re-organization' },
    {
      value: 'SalaryScheduleAdjustment',
      label: 'Salary Schedule Adjustment',
    },
    { value: 'WorkerRequest', label: 'Worker Request' },
  ],
  Promotion: [
    { value: 'InternalRecruitment', label: 'Internal Recruitment' },
    { value: 'Performance', label: 'Performance' },
    { value: 'Reorganization', label: 'Re-organization' },
  ],
  StartProbationPeriod: [
    { value: 'Disciplinary', label: 'Disciplinary' },
    { value: 'Performance', label: 'Performance' },
    { value: 'Probation', label: 'Probation' },
    { value: 'Reorganization', label: 'Re-organization' },
  ],
  SuspendAssignment: [
    { value: 'Performance', label: 'Performance' },
    { value: 'Reorganization', label: 'Re-organization' },
  ],
  TemporaryAssignment: [
    { value: 'CarrerProgression', label: 'Carrer Progression' },
    { value: 'ManagerRequest', label: 'Manager Request' },
    { value: 'Probation', label: 'Probation' },
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'StaffingShortage', label: 'Staffing Shortage' },
    { value: 'WorkerRequest', label: 'Worker Request' },
  ],
  Transfer: [
    { value: 'AdditionalWorkLoad', label: 'Additional Work Load' },
    { value: 'CarrerProgression', label: 'Carrer Progression' },
    { value: 'InternalRecruitment', label: 'InternalRecruitment' },
    { value: 'LocationChange', label: 'Location Change' },
    { value: 'ManagerRequest', label: 'Manager Request ' },
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'TransfertoNewLocation', label: 'Transfer to New Location' },
    { value: 'WorkerRequest', label: 'Worker Request' },
    { value: 'EmployeeWish', label: 'Employee Wish' },
  ],
  WorkingHoursChange: [
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'WorkerRequest', label: 'Worker Request' },
  ],
};


private reasonsMapForCorrection: { [key: string]: { value: string; label: string }[];} = {
  AssignmentChange: [
    { value: 'AwardTenure', label: 'AwardTenure' },
    {
      value: 'Awardunitofservice-Tenure',
      label: 'Awardunitofservice-Tenure',
    },
    { value: 'CareerProgression', label: 'CareerProgression' },
    { value: 'ContractRenewal', label: 'ContractRenewal' },
    { value: 'LeaveofAbsence', label: 'LeaveofAbsence' },
    {
      value: 'LeaveofAbsence-Sabbatical',
      label: 'LeaveofAbsence-Sabbatical',
    },
    { value: 'LeaveofAbsence-unpaid', label: 'LeaveofAbsence-unpaid' },
    { value: 'ProjectAssignment', label: 'ProjectAssignment' },
    { value: 'Reorganization', label: 'Reorganization' },
    { value: 'ReturnfromLOA', label: 'ReturnfromLOA' },
    { value: 'ReturnfromLOASabbatical', label: 'ReturnfromLOASabbatical' },
  ],
  Demotion: [
    { value: 'Performance', label: 'Performance' },
    { value: 'Reorganization', label: 'Reorganization' },
    { value: 'WorkerRequest', label: 'WorkerRequest' },
  ],
  EndProbationPeriod: [
    { value: 'EndProbation', label: 'EndProbation' },
    { value: 'Performance', label: 'Performance' },
  ],
  GlobalTransfer: [{ value: 'EmployeeTransfer', label: 'Employee Transfer' }],
  JobLocationchange: [
    { value: 'AgreementChange', label: 'Agreement Change' },
  ],
  JobChange: [
    { value: 'Performance', label: 'Performance' },
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'WorkerRequest', label: 'Worker Request' },
  ],
  LocationChange: [
    { value: 'Relocation', label: 'Re-location' },
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'WorkerRequest', label: 'Worker Request' },
  ],
  ManagerChange: [
    {
      value: 'AdditionofAssignmentforManager',
      label: 'Addition of Assignment for Manager',
    },
    {
      value: 'AdditionofContingentWorkRelationshipforManger',
      label: 'Addition of Contingent Work Relationship for Manger',
    },
    {
      value: 'AdditionofEmploymentTermsforManger',
      label: 'Addition of Employment Terms for Manger',
    },
    {
      value: 'AdditionofNonworkerWorkRelationshipforManager',
      label: 'Addition of Non-worker Work Relationship for Manager',
    },
    {
      value: 'AdditionofNonWorkerforManager',
      label: 'Addition of Non-Worker for Manager',
    },
    {
      value: 'AdditionofPendingWorkerforManager',
      label: 'Addition of Pending Worker for Manager',
    },
    {
      value: 'ChangeofLocationofManager',
      label: 'Change of Location of Manager',
    },
    {
      value: 'ChangeofManagerofManager',
      label: 'Change of Manager of Manager',
    },
    {
      value: 'EndofAssignmentforManager',
      label: 'End of Assignment for Manager',
    },
    {
      value: 'EndofEmploymentTermsforManager',
      label: 'End of Employment Terms for Manager',
    },
    {
      value: 'EndofGlobalTemporaryAssignmentforManager',
      label: 'End of Global Temporary Assignment for Manager',
    },
    {
      value: 'EndofTemporaryAssignmentforManager',
      label: 'End of Temporary Assignment for Manager',
    },
    {
      value: 'GlobalTemporaryassignmentforManager',
      label: 'Global Temporary assignment for Manager',
    },
    { value: 'GlobalTransferofManager', label: 'Global Transfer of Manager' },
    { value: 'NewHireofManager', label: 'New Hire of Manager' },
    { value: 'PromotionofManger', label: 'Promotion of Manger' },
    {
      value: 'ReassignmentofManagerReports',
      label: 'Re-assignment of Manager Reports',
    },
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'Resignationofmanager', label: 'Resignation of manager' },
    {
      value: 'TemporaryAssignmentofManager',
      label: 'Temporary Assignment of Manager',
    },
    { value: 'TerminationofManager', label: 'Termination of Manager' },
    { value: 'TransferofManager', label: 'Transfer of Manager' },
  ],
  PositionChange: [
    { value: 'BudgetAdjustment', label: 'Budget Adjustment' },
    { value: 'Performance', label: 'Performance' },
    {
      value: 'PositionDistributionAllocation',
      label: 'Position Distribution Allocation',
    },
    {
      value: 'PositionReclassification',
      label: 'Position Re-classification',
    },
    { value: 'Reorganization', label: 'Re-organization' },
    {
      value: 'SalaryScheduleAdjustment',
      label: 'Salary Schedule Adjustment',
    },
    { value: 'WorkerRequest', label: 'Worker Request' },
  ],
  Promotion: [
    { value: 'InternalRecruitment', label: 'Internal Recruitment' },
    { value: 'Performance', label: 'Performance' },
    { value: 'Reorganization', label: 'Re-organization' },
  ],
  StartProbationPeriod: [
    { value: 'Disciplinary', label: 'Disciplinary' },
    { value: 'Performance', label: 'Performance' },
    { value: 'Probation', label: 'Probation' },
    { value: 'Reorganization', label: 'Re-organization' },
  ],
  Transfer: [
    { value: 'AdditionalWorkLoad', label: 'Additional Work Load' },
    { value: 'CarrerProgression', label: 'Carrer Progression' },
    { value: 'InternalRecruitment', label: 'InternalRecruitment' },
    { value: 'LocationChange', label: 'Location Change' },
    { value: 'ManagerRequest', label: 'Manager Request ' },
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'TransfertoNewLocation', label: 'Transfer to New Location' },
    { value: 'WorkerRequest', label: 'Worker Request' },
    { value: 'EmployeeWish', label: 'Employee Wish' },
  ],
  WorkingHoursChange: [
    { value: 'Reorganization', label: 'Re-organization' },
    { value: 'WorkerRequest', label: 'Worker Request' },
  ],
};

actionsforCorrection: { value: string; label: string }[] = [
  { value: '', label: 'Select an action' },
  { value: 'AssignmentChange', label: 'Assignment Change' },
  { value: 'Demotion', label: 'Demotion' },
  { value: 'EndProbationPeriod', label: 'End Probation Period' },
  { value: 'GlobalTransfer', label: 'Global Transfer' },
  { value: 'JobLocationchange', label: 'Job Location Change' },
  { value: 'JobChange', label: 'Job Change' },
  { value: 'LocationChange', label: 'Location Change' },
  { value: 'ManagerChange', label: 'Manager Change' },
  { value: 'PositionChange', label: 'Position Change' },
  { value: 'Promotion', label: 'Promotion' },
  { value: 'StartProbationPeriod', label: 'Start Probation Period' },
  { value: 'Transfer', label: 'Transfer' },
  { value: 'WorkingHoursChange', label: 'Working Hours Change' },
];

actionsforUpdate:{value:string; label:string}[] =[
  { value: '', label: 'Select an action' },
  { value: 'AddAssignment', label: 'Add Assignment' },
  { value: 'AssignmentChange', label: 'Assignment Change' },
  { value: 'Demotion', label: 'Demotion' },
  { value: 'EndAssignment', label: 'End Assignment' },
  { value: 'EndProbationPeriod', label: 'End Probation Period' },
  {
    value: 'ExtendTemporaryAssignment',
    label: 'Extend Temporary Assignment',
  },
  { value: 'GlobalTransfer', label: 'Global Transfer' },
  {
    value: 'GlobalTemporaryAssignment',
    label: 'Global Temporary Assignment',
  },
  { value: 'JobLocationchange', label: 'Job Location Change' },
  { value: 'JobChange', label: 'Job Change' },
  { value: 'LocationChange', label: 'Location Change' },
  { value: 'ManagerChange', label: 'Manager Change' },
  { value: 'PositionChange', label: 'Position Change' },
  { value: 'Promotion', label: 'Promotion' },
  { value: 'StartProbationPeriod', label: 'Start Probation Period' },
  { value: 'SuspendAssignment', label: 'Suspend Assignment' },
  { value: 'TemporaryAssignment', label: 'Temporary Assignment' },
  { value: 'Transfer', label: 'Transfer' },
  { value: 'WorkingHoursChange', label: 'Working Hours Change' },
];

getReasons(key: string): { value: string; label: string }[] {
  return this.reasonsMap[key] || [];
}

getReasonsForCorrection(key: string): { value: string; label: string }[] {
  return this.reasonsMapForCorrection[key] || [];
}


}
