// Maps only MaterialCommunityIcons for HomeCategoryIcon

interface enumType {
  [id: string]: string;
}

export const HomeCategoryIcon: enumType = {
  TOTAL: 'sigma',
  OPEN: 'folder-outline',
  ADDRESSED: 'check',
  MONITORING: 'power',
};

export const HomeCategoryColor: enumType = {
  TOTAL: 'infoLighter',
  OPEN: 'secondaryDark',
  ADDRESSED: 'successLightest',
  MONITORING: 'warningDarker',
};

export const HomePieColor: enumType = {
  OPEN: 'warning',
  MONITORING: 'secondary',
};

// Maps only MaterialCommunityIcons for HomeCategoryIcon
export const SeverityCategoryIcon: enumType = {
  HIGH: 'chart-bar',
  MEDIUM: 'reorder-horizontal',
  LOW: 'arrow-down-thick',
  FYI: 'flag-variant',
};

export const SeverityCategoryColor: enumType = {
  HIGH: 'primaryLight',
  MEDIUM: 'secondaryLight',
  LOW: 'warning',
  FYI: 'greyDark',
};

export const SeverityPieColor: enumType = {
  HIGH: 'primary',
  FYI: 'grey',
};

export const MeterBarColor: enumType = {
  ADDRESSED: 'info',
  PENDING: 'infoLight',
};

export const MeterPieColor: enumType = {
  ADDRESSED: 'success',
  PENDING: 'warning',
};

// MaterialCommunityIcons
export const TabDashboardIcon: enumType = {
  HOME: 'home',
  TYPE: 'call-merge',
  SEVERITY: 'domain',
  METER: 'disc',
};
