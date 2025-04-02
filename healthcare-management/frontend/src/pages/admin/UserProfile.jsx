import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { _get, _post, _put } from "../../Service/ApiServiceProvider";
import { FaCheck, FaTimes } from 'react-icons/fa'; // For approval and rejection icons
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const { data } = await _get(`/user/${userId}`);
        setUser(data?.user ?? {});
        setLoading(false);
      } catch (err) {
        setError('Failed to load doctor details');
        setLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [userId]);

  const handleApprove = async () => {
    try {
      setLoading(true);
      const response = await _put(`/user/${userId}`, {
        isActive: true
      });
      toast.success(response.data.message);
      setUser(response.data.user)
    } catch (err) {
      toast.error('Error approving the doctor');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      const response = await _put(`/user/${userId}`, {
        isActive: false
      });
      toast.success(response.data.message);
      setUser(response.data.user)
    } catch (err) {
      toast.error('Error rejecting the doctor');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor Profile</h2>
      {user && (
        <div>
          <div className="mb-4">
            <p className="text-xl font-semibold text-gray-700">Full Name: {user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
            <p className="text-sm text-gray-600">Phone: {user.mobileNumber}</p>
            <p className="text-sm text-gray-600">Role: {user.role}</p>
            <p className="text-sm text-gray-600">Status: {user.isActive ? 'Active' : 'Deactive'}</p>
          </div>

          {/* Approve and Reject buttons */}
          <div className="flex space-x-4">
            {!user.isActive ? <button
              onClick={handleApprove}
              disabled={loading || user.status === 'approved'}
              className={`px-4 py-2 bg-green-500 text-white rounded-md flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaCheck className="mr-2" />
              Active
            </button>
            :
            <button
              onClick={handleReject}
              disabled={loading || user.status === 'rejected'}
              className={`px-4 py-2 bg-red-500 text-white rounded-md flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaTimes className="mr-2" />
              Reject
            </button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
