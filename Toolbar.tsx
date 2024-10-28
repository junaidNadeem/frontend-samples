// Custom toolbar component for data grid, integrating a download feature and a date filter for managing job post data

import { TimezoneToolbar } from "@libs/ui/datagrid-toolbars";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import LoadingButton from "@mui/lab/LoadingButton";

import { DateFilter } from "../common/userTableFilters/DateFilter";
import { useDownloadCSV } from "./hooks/useDownloadCSV";

interface ToolbarProps {
  jobPostId?: string;
  onDateFilterChange: (dateRange: any) => void;
  urlParams: any;
}

const ExportButton = ({ jobPostId }: { jobPostId?: string }) => {
  const { handleDownload, loading } = useDownloadCSV();
  return (
    <LoadingButton
      onClick={() => handleDownload({ jobPostId })}
      variant="text"
      color="primary"
      startIcon={<FileDownloadIcon />}
      loading={loading}
    >
      Export
    </LoadingButton>
  );
};

export const Toolbar = ({ jobPostId, onDateFilterChange, urlParams }: ToolbarProps) => {
  return (
    <TimezoneToolbar
      isTimeZoneEnabled={false}
      autoFocus={false}
      isExportable={false}
      quickFilterPlaceholder="Search name or email"
      leading={<ExportButton jobPostId={jobPostId} />}
      leadingSearchInput={
        <DateFilter onDateFilterChange={onDateFilterChange} urlParams={urlParams} />
      }
    />
  );
};
