import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import apiService from './apiService';
import { Employee, EmployeeData } from './types';

interface Props {
  isVisible: boolean;
  onCancel: () => void;
  onSubmit: SubmitHandler<EmployeeData>;
  selectedEmployee: Employee | null;
  onFileChange: (file: File) => void;
}

const EmployeeForm: React.FC<Props> = ({ isVisible, onCancel, onSubmit, selectedEmployee, onFileChange }) => {
  const { handleSubmit, control, formState: { errors = {} }, reset } = useForm<Employee>();
  const [countryDropdown, setCountryDropdown] = useState<any[]>([]);
  const [stateDropdown, setStateDropdown] = useState<any[]>([]);
  const [cityDropdown, setCityDropdown] = useState<any[]>([]);

  useEffect(() => {
    apiService.getCountries()
      .then(response => {
        setCountryDropdown(response.data);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleStateChange = (value: string) => {
    apiService.getCitiesByState(value)
      .then(response => {
        setCityDropdown(response.data);
      })
      .catch(error => console.error('Error fetching cities by state:', error));
  }

  const handleCountryChange = (value: string) => {
    apiService.getStatesByCountry(value)
      .then(response => {
        setStateDropdown(response.data);
      })
      .catch(error => console.error('Error fetching states by country:', error));
  }

  return (
    <Modal
      title="Employee Details"
      open={isVisible}
      onCancel={() => {
        reset();
        onCancel();
      }}
      footer={[
        <Button key="cancel" onClick={() => onCancel()}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>,
      ]}
    >
      <form>
        <div className="row">
          <div className="col-md-6">
            {/* First Name */}
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Controller
                name="firstName"
                control={control}
                defaultValue={
                  selectedEmployee ? selectedEmployee.firstName : ""
                }
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    id="firstName"
                    maxLength={50}
                  />
                )}
              />
              <span className="text-danger">
                {errors.firstName && errors.firstName.message}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            {/* Last Name */}
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Controller
                name="lastName"
                control={control}
                defaultValue={selectedEmployee ? selectedEmployee.lastName : ""}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    id="lastName"
                    maxLength={50}
                  />
                )}
              />
              <span className="text-danger">
                {errors.lastName && errors.lastName.message}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Controller
                name="email"
                control={control}
                defaultValue={selectedEmployee ? selectedEmployee.email : ""}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className="form-control"
                    id="email"
                    maxLength={50}
                  />
                )}
              />
              <span className="text-danger">
                {errors.email && errors.email.message}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            {/* Gender */}
            <div className="form-group">
              <label>Gender</label>
              <br />
              <Controller
                name="gender"
                control={control}
                defaultValue={selectedEmployee ? selectedEmployee.gender : "M"}
                render={({ field }) => (
                  <>
                    <div className="form-check form-check-inline">
                      <input
                        {...field}
                        className="form-check-input"
                        type="radio"
                        id="maleGender"
                        value="M"
                        defaultChecked={field.value === "M"}
                      />
                      <label className="form-check-label" htmlFor="maleGender">
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        {...field}
                        className="form-check-input"
                        type="radio"
                        id="femaleGender"
                        value="F"
                        defaultChecked={field.value === "F"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="femaleGender"
                      >
                        Female
                      </label>
                    </div>
                  </>
                )}
              />
              <span className="text-danger">
                {errors.gender && errors.gender.message}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* Photo */}
            <div className="form-group">
              <label htmlFor="photo">Photo</label>
              <Controller
                name="photo"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="file"
                    className="form-control-file"
                    id="photo"
                    value=""
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file){
                        onFileChange(file);
                      }
                    }}
                  />
                )}
              />
              <span className="text-danger">
                {errors.photo && errors.photo.message}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            {/* Marital Status */}
            <div className="form-group">
              <div className="form-check">
                <Controller
                  name="maritalStatus"
                  control={control}
                  defaultValue={
                    selectedEmployee ? selectedEmployee.maritalStatus : false
                  }
                  render={({ field }) => (
                    <input
                      {...field}
                      className="form-check-input"
                      type="checkbox"
                      id="maritalStatus"
                      value={field.value.toString()}
                    />
                  )}
                />
                <label className="form-check-label" htmlFor="maritalStatus">
                  Are you married?
                </label>
              </div>
              <span className="text-danger">
                {errors.maritalStatus && errors.maritalStatus.message}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* Birth Date */}
            <div className="form-group">
              <label htmlFor="birthDate">Birth Date</label>
              <Controller
                name="birthDate"
                control={control}
                defaultValue={
                  selectedEmployee
                    ? new Date(selectedEmployee.birthDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="form-control"
                    id="birthDate"
                  />
                )}
              />
              <span className="text-danger">
                {errors.birthDate && errors.birthDate.message}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            {/* Hobbies */}
            <div className="form-group">
              <label htmlFor="hobbies">Hobbies</label>
              <Controller
                name="hobbies"
                control={control}
                defaultValue={selectedEmployee ? selectedEmployee.hobbies : ""}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    id="hobbies"
                    maxLength={100}
                  />
                )}
              />
              <span className="text-danger">
                {errors.hobbies && errors.hobbies.message}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* Salary */}
            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <Controller
                name="salary"
                control={control}
                defaultValue={selectedEmployee ? selectedEmployee.salary : 0}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="form-control"
                    id="salary"
                    min="5000"
                    step="any"
                  />
                )}
              />
              <span className="text-danger">
                {errors.salary && errors.salary.message}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            {/* Address */}
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Controller
                name="address"
                control={control}
                defaultValue={selectedEmployee ? selectedEmployee.address : ""}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="form-control"
                    id="address"
                    maxLength={500}
                  />
                )}
              />
              <span className="text-danger">
                {errors.address && errors.address.message}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* Country */}
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <Controller
                name="country"
                control={control}
                defaultValue={
                  selectedEmployee ? selectedEmployee.country : null
                }
                render={({ field }) => (
                  <select
                    {...field}
                    className="form-control"
                    id="ddlCountry"
                    value={selectedEmployee ? selectedEmployee.country || '' : ''}
                    onChange={(e) => {
                      const dropdownselectedCountry = e.target.value;
                      field.onChange(dropdownselectedCountry);
                      handleCountryChange(dropdownselectedCountry);
                    }}
                  >
                    {countryDropdown.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                )}
              />
              <span className="text-danger">
                {errors.country && errors.country.message}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            {/* State */}
            <div className="form-group">
              <label htmlFor="state">State</label>
              <Controller
                name="state"
                control={control}
                defaultValue={selectedEmployee ? selectedEmployee.state : null}
                render={({ field }) => (
                  <select
                    {...field}
                    className="form-control"
                    id="ddlState"
                    value={selectedEmployee ? selectedEmployee.state || '' : ''}
                    onChange={(e) => {
                      const dropdownselectedState = e.target.value;
                      field.onChange(dropdownselectedState);
                      handleStateChange(dropdownselectedState);
                    }}
                  >
                    {stateDropdown.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.stateName}
                      </option>
                    ))}
                  </select>
                )}
              />
              <span className="text-danger">
                {errors.state && errors.state.message}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* City */}
            <div className="form-group">
              <label htmlFor="city">City</label>
              <Controller
                name="city"
                control={control}
                defaultValue={selectedEmployee ? selectedEmployee.city : null}
                render={({ field }) => (
                  <select {...field} className="form-control" id="ddlCity" value={selectedEmployee ? selectedEmployee.city || '' : ''}>
                    {cityDropdown.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                )}
              />
              <span className="text-danger">
                {errors.city && errors.city.message}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            {/* Zip Code */}
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <Controller
                name="zipCode"
                control={control}
                defaultValue={selectedEmployee ? selectedEmployee.zipCode : ""}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    id="zipCode"
                    maxLength={6}
                  />
                )}
              />
              <span className="text-danger">
                {errors.zipCode && errors.zipCode.message}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Controller
                name="password"
                control={control}
                defaultValue={selectedEmployee ? selectedEmployee.password : ""}
                rules={{
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,16}$/,
                    message:
                      "Password must be 8-16 characters long and contain at least one uppercase letter, one number, and one special character.",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className="form-control"
                    id="password"
                    title="Password must be 8-16 characters long and contain at least one uppercase letter, one number, and one special character."
                    required
                  />
                )}
              />
              <span className="text-danger">
                {errors.password && errors.password.message}
              </span>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeForm;
