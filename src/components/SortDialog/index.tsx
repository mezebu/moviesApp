import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

interface SortDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSortChange: (criteria: string) => void;
  sortOptions: { label: string; value: string }[];
}

const SortDialog: React.FC<SortDialogProps> = ({
  open,
  onClose,
  onSortChange,
  sortOptions,
  title,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <List>
        {sortOptions.map((option) => (
          <ListItem key={option.value} disablePadding>
            <ListItemButton onClick={() => onSortChange(option.value)}>
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default SortDialog;
