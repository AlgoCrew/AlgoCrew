// components/DeveloperRoleSelector.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Select, Icon, Text, Column, Chip, useToast } from "@once-ui-system/core";

// Define props for the new component
interface DeveloperRoleSelectorProps {
  selectedRoles: string[]; // The array of currently selected roles from the parent
  onRolesChange: (roles: string[]) => void; // Callback to update roles in the parent
  errorMessage?: string; // Optional error message from the parent
}

const developerRoleOptions = [
  { label: "Cloud Engineer", value: "Cloud Engineer" },
  { label: "Fullstack Developer", value: "Fullstack Developer" },
  { label: "Backend Developer", value: "Backend Developer" },
  { label: "Frontend Developer", value: "Frontend Developer" },
  { label: "Data Scientist", value: "Data Scientist" },
  { label: "DevOps Engineer", value: "DevOps Engineer" },
  { label: "UI/UX Designer", value: "UI/UX Designer" },
  { label: "QA Engineer", value: "QA Engineer" },
  { label: "Mobile Developer (iOS/Android)", value: "Mobile Developer" },
  { label: "Project Manager", value: "Project Manager" },
];

export const DeveloperRoleSelector: React.FC<DeveloperRoleSelectorProps> = ({
  selectedRoles,
  onRolesChange,
  errorMessage,
}) => {
  const [selectedRoleFromSelect, setSelectedRoleFromSelect] = useState('');
  const [userSelectedRoles, setUserSelectedRoles] = useState([]);
  const { addToast } = useToast();

  // Handler for when a role is selected from the dropdown
  const handleRoleSelect = (selectedOption: string ) => {
    const roleValue = selectedOption;
    setSelectedRoleFromSelect(roleValue); // Set the value in the select input
    setUserSelectedRoles
    // Add the role to selectedRoles if it's not already there
    if (!selectedRoles.includes(roleValue)) {
      onRolesChange([...selectedRoles, roleValue]); // Use the callback to update parent state
    }
    addToast({
      variant: "success",
      message: selectedOption + " is added"
    })
  }


  // Handler to remove a role from the selected list
  const handleRemoveRole = (roleToRemove: string) => {
    onRolesChange(selectedRoles.filter((role) => role !== roleToRemove)); // Use the callback to update parent state

    addToast({
      variant: "danger",
      message: roleToRemove + " is removed"
    })
  }


  return (
    <Column gap="s">
      <Select
        id="developer-role-select"
        label="Add a developer role"
        value="roles selected"
        searchable
        emptyState={
          <Text onBackground="neutral-weak">
            No matching roles found
          </Text>
        }
        hasPrefix={
          <Icon marginLeft="4" onBackground="neutral-weak" name="person" size="xs" />
        }
        options={developerRoleOptions.filter(
          (option) => !selectedRoles.includes(option.value) // Filter out already selected roles
        )}
        onSelect={(selectedOption) => handleRoleSelect(selectedOption)} // Pass selectedOption correctly
      />

      {selectedRoles.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedRoles.map((role) => (
            <Chip onBackground="brand-strong" selected className='cursor-pointer neutral-background-weak' key={role} label={role} onRemove={() => handleRemoveRole(role)} />
          ))}
        </div>
      )}

      {selectedRoles.length === 0 && errorMessage && errorMessage.includes("Please select at least one") && (
        <Text color="red-500" marginTop="s">{errorMessage}</Text>
      )}
    </Column>
  );
};
