"use client";
import { IPermissionRes, IRoleRes } from "@/models/api/authority-api";
import authorityApi from "@/services/authority-api";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Typography, FormControlLabel, FormControl, Checkbox, InputLabel, MenuItem } from "@mui/material";
import { StyledPrimaryButton } from "@/styles/commons";

type Props = {};

const PermissionsPage = (props: Props) => {
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState<IRoleRes[]>([]);
  const [permissions, setPermissions] = useState<IPermissionRes[]>([]);
  const [permissionValues, setPermissionValues] = useState<any[]>([]);
  const [expandList, setExpandList] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleCheckAllPerMissionValue = (groupValue: any) => {
    const groups = [...permissionValues];

    const existingGroupIndex = groups.findIndex((selectedGroup) => selectedGroup.groupName === groupValue.groupName);

    if (existingGroupIndex !== -1) {
      groups.splice(existingGroupIndex, 1);
    } else {
      const allItemsInGroup = groupValue.names.map((item: any) => ({
        id: item.id,
        permissionName: item.permissionName,
      }));
      groups.push({ groupName: groupValue.groupName, names: allItemsInGroup });
    }

    setPermissionValues(groups);
  };

  const handleChangePermissionValues = (groupValue: any, item: any) => {
    let permissionGroups = [...permissionValues];
    const existingGroupIndex = permissionGroups.findIndex(
      (selectedGroup) => selectedGroup.groupName === groupValue.groupName,
    );

    if (existingGroupIndex !== -1) {
      const existingGroup = permissionGroups[existingGroupIndex];
      const existingItemIndex = existingGroup.names.findIndex((groupItem: any) => groupItem.id === item.id);

      if (existingItemIndex !== -1) {
        // console.log(existingGroup);

        existingGroup.names.splice(existingItemIndex, 1);
        if (existingGroup.names.length === 0) {
          permissionGroups.splice(existingGroupIndex, 1);
        }
      } else {
        existingGroup.names.push({ id: item.id, permissionName: item.permissionName });
      }
    } else {
      permissionGroups.push({
        groupName: groupValue.groupName,
        names: [{ id: item.id, permissionName: item.permissionName }],
      });
    }

    setPermissionValues(permissionGroups);
  };

  const handleExpandedListItem = (key: string) => {
    const array = [...expandList];
    const index = array.indexOf(key);

    if (index !== -1) {
      array.splice(index, 1);
    } else {
      array.push(key);
    }

    setExpandList(array);
  };

  const handleGetListRoles = async () => {
    const response = await authorityApi.getRoles();
    setRoles(response.collection);
  };

  const handleRefactorResponse = async (response: any) => {
    const groupedPermissions = response.collection.reduce((acc: any, permission: any) => {
      const [groupName, permissionName] = permission.name.split(":");

      const existingGroup = acc.find((group: any) => group.groupName === groupName);

      if (existingGroup) {
        existingGroup.names.push({
          id: permission.id,
          permissionName: [permissionName],
        });
      } else {
        acc.push({
          groupName,
          names: [
            {
              id: permission.id,
              permissionName: [permissionName],
            },
          ],
        });
      }

      return acc;
    }, []);
    return groupedPermissions;
  };

  const handleGetListPermission = async () => {
    const response = await authorityApi.getPermissions(100);
    const groupedPermissions = await handleRefactorResponse(response);

    setPermissions(groupedPermissions);
  };

  const handleGetPerMissionsFromRole = async () => {
    const response = await authorityApi.getPermissionsFromRole(parseInt(role));
    const groupedPermissions = await handleRefactorResponse(response);

    setPermissionValues(groupedPermissions);
  };

  const handleSavePermissions = async () => {
    let allRolePermissions: any[] = [];

    const selectPermissions = permissionValues;
    const selectTedPermissionsList = selectPermissions.map((permission) => permission.names).flat();
    const permissionList = permissions.map((permission) => permission.names).flat();

    for (let i = 0; i < permissionList.length; i++) {
      allRolePermissions = [...allRolePermissions, [selectTedPermissionsList[i]]];
    }

    const permissionIds = allRolePermissions.map((permission) => permission[0]?.id);
    const filteredPermissionIds = permissionIds.filter((id) => id !== null && id !== undefined);

    const model = {
      role_id: parseInt(role),
      permission_ids: filteredPermissionIds,
    };
    setLoading(true);
    authorityApi
      .updatePermissions(model)
      .then((result) => {
        if (result.status === "success") {
          setLoading(false);
          console.log("Save success");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetListRoles();
    handleGetListPermission();
  }, []);

  useEffect(() => {
    if (role) handleGetPerMissionsFromRole();
  }, [role]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="w-full bg-white h-100px p-4 mb-2 mt-2 font-medium">Permission</div>

      <div className="bg-white h-fit">
        <div>
          <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
            <InputLabel id="demo-select-small-label">Role</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={role}
              label="Role"
              onChange={handleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="h-fit">
          <Typography variant="h3">
            {role && (
              <StyledPrimaryButton loading={isLoading} loadingPosition="start" onClick={() => handleSavePermissions()}>
                Save
              </StyledPrimaryButton>
            )}
          </Typography>
          {role && (
            <div className="m-8 flex flex-wrap gap-4">
              {permissions.map((permission) => (
                <div key={permission.id} className="flex flex-1 flex-col max-w-[calc(33.33%-8px)] gap-y-2">
                  <div className={`flex gap-x-[6px] flex-col ${expandList?.includes(permission.groupName)} ? : `}>
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 flex-shrink-0 cursor-pointer mr-[2px] transition-all ease duration-400 ${
                          expandList?.includes(permission.groupName) ? "rotate-90" : "rotate-0"
                        } `}
                        onClick={() => handleExpandedListItem(permission.groupName)}
                      >
                        <ChevronRightIcon />
                      </div>
                      <FormControlLabel
                        label={permission.groupName}
                        control={
                          <Checkbox
                            checked={Boolean(
                              permissionValues.some(
                                (item) =>
                                  item.groupName === permission.groupName &&
                                  item.names.length === permission.names.length,
                              ),
                            )}
                            indeterminate={Boolean(
                              permissionValues.some(
                                (item) =>
                                  item.groupName === permission.groupName &&
                                  item.names.length !== permission.names.length,
                              ),
                            )}
                            onChange={() => handleCheckAllPerMissionValue(permission)}
                          />
                        }
                      />
                    </div>
                    <div
                      className={`min-w-[180px] max-h-0 transition-all duration-300 ease overflow-hidden ${
                        expandList?.includes(permission.groupName) ? "max-h-[100%]" : "max-h-0"
                      }`}
                    >
                      <div className="w-full max-h-full flex flex-col whitespace-nowrap ml-10">
                        {permission.names.map((item: any) => (
                          <FormControlLabel
                            key={item.id}
                            label={item.permissionName}
                            control={
                              <Checkbox
                                checked={Boolean(
                                  permissionValues.some((permissionGroup) =>
                                    permissionGroup.names.some((groupItem: any) => groupItem.id === item.id),
                                  ),
                                )}
                                onChange={() => handleChangePermissionValues(permission, item)}
                              />
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermissionsPage;
