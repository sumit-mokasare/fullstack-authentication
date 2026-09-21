import React, { useRef, useState } from 'react';
import {
  X,
  User,
  Mail,
  BadgeCheck,
  LogOut,
  Camera,
  KeyRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAuthStore } from '../../stores/authStore';
import { authApi } from '../../api/authApi';

const ProfileDetail = ({ onClose }) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const avatarInputRef = useRef(null);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState('');

  const [isResendingVerify, setIsResendingVerify] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(''); // '' | 'sent' | 'error'

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearAuth();
      onClose();
    }
  };

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarError('');
    setIsUpdatingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      // Let the browser set Content-Type (with boundary) itself —
      // don't override it, or multer won't be able to parse the file.
      const res = await authApi.updateAvatar(formData);
      setUser(res?.data);
    } catch (error) {
      setAvatarError(
        error?.response?.data?.message || 'Could not update avatar.',
      );
    } finally {
      setIsUpdatingAvatar(false);
      e.target.value = '';
    }
  };

  const handleResendVerification = async () => {
    if (!user?.email) return;
    setIsResendingVerify(true);
    setVerifyStatus('');
    try {
      await authApi.resendVerification(user.email);
      setVerifyStatus('sent');
    } catch {
      setVerifyStatus('error');
    } finally {
      setIsResendingVerify(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
      <div
        className="absolute right-0 top-0 flex h-screen w-full max-w-sm flex-col border-l border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="text-lg font-semibold text-foreground">My Profile</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-muted"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile + Avatar (the only edit action kept inline in this panel) */}
        <div className="flex flex-col items-center border-b border-border px-6 py-8">
          <div className="relative">
            <img
              src={user?.avatar?.url || 'https://i.pravatar.cc/150?img=8'}
              alt={user?.username || 'Profile'}
              className="h-24 w-24 rounded-full border-4 border-primary object-cover"
            />
            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={isUpdatingAvatar}
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition hover:opacity-90 disabled:opacity-50"
              aria-label="Change avatar"
            >
              <Camera size={14} />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {isUpdatingAvatar && (
            <p className="mt-2 text-xs text-muted-foreground">Uploading...</p>
          )}
          {avatarError && (
            <p className="mt-2 text-xs text-red-600 text-destructive">
              {avatarError}
            </p>
          )}

          <h3 className="mt-4 text-xl font-semibold text-foreground">
            {user?.username || 'User'}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {user?.email || 'No email'}
          </p>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
            <User className="text-primary" size={20} />
            <div>
              <p className="text-xs text-muted-foreground">Username</p>
              <p className="font-medium text-foreground">
                {user?.username || 'Not available'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
            <Mail className="text-primary" size={20} />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">
                {user?.email || 'Not available'}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BadgeCheck
                  className={
                    user?.isEmailVerified ? 'text-green-500' : 'text-yellow-500'
                  }
                  size={20}
                />
                <div>
                  <p className="text-xs text-muted-foreground">Email Status</p>
                  <p
                    className={
                      user?.isEmailVerified
                        ? 'font-medium text-green-500'
                        : 'font-medium text-yellow-500'
                    }
                  >
                    {user?.isEmailVerified ? 'Verified' : 'Not Verified'}
                  </p>
                </div>
              </div>

              {!user?.isEmailVerified && (
                <button
                  onClick={handleResendVerification}
                  disabled={isResendingVerify}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                >
                  {isResendingVerify ? 'Sending...' : 'Verify'}
                </button>
              )}
            </div>

            {verifyStatus === 'sent' && (
              <p className="mt-2 text-xs text-muted-foreground">
                Verification email sent — check your inbox.
              </p>
            )}
            {verifyStatus === 'error' && (
              <p className="mt-2 text-xs text-destructive">
                Couldn't send verification email. Try again.
              </p>
            )}
          </div>

          {/* Change password — moved to its own page, this is just a link out */}
          <Link
            to="/forgot-password"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition hover:bg-muted"
          >
            <KeyRound className="text-primary" size={20} />
            <div>
              <p className="font-medium text-foreground">Change password</p>
              <p className="text-xs text-muted-foreground">
                Send yourself a reset link
              </p>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
