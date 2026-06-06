import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Plus, Trash2, Edit2, X, Check } from 'lucide-react';

/**
 * Design System: Modern Engineering Minimalism
 * Certificates component with editable functionality
 * Only editable by the user (local storage)
 */

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  isEditable?: boolean;
}

export const Certificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      name: 'Introduction to Electrical Engineering',
      issuer: 'Coursera',
      date: 'Expected: June 2026',
      isEditable: false
    },
    {
      id: '2',
      name: 'Claude AI Mastery & Advanced Prompt Engineering',
      issuer: 'Anthropic',
      date: 'Expected: June - December 2026',
      isEditable: false
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Certificate | null>(null);
  const [newCert, setNewCert] = useState<Partial<Certificate>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const password = localStorage.getItem('portfolio_password');
    if (password === 'tshepiso2026') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleEdit = (cert: Certificate) => {
    if (!isAuthenticated) {
      const pwd = prompt('Enter password to edit certificates:');
      if (pwd === 'tshepiso2026') {
        setIsAuthenticated(true);
        localStorage.setItem('portfolio_password', pwd);
      } else {
        alert('Incorrect password');
        return;
      }
    }
    setEditingId(cert.id);
    setEditForm({ ...cert });
  };

  const handleSaveEdit = () => {
    if (editForm) {
      setCertificates(
        certificates.map(cert => (cert.id === editForm.id ? editForm : cert))
      );
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleDelete = (id: string) => {
    if (!isAuthenticated) {
      const pwd = prompt('Enter password to delete certificates:');
      if (pwd === 'tshepiso2026') {
        setIsAuthenticated(true);
        localStorage.setItem('portfolio_password', pwd);
      } else {
        alert('Incorrect password');
        return;
      }
    }
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      setCertificates(certificates.filter(cert => cert.id !== id));
    }
  };

  const handleAddCertificate = () => {
    if (!isAuthenticated) {
      const pwd = prompt('Enter password to add certificates:');
      if (pwd === 'tshepiso2026') {
        setIsAuthenticated(true);
        localStorage.setItem('portfolio_password', pwd);
      } else {
        alert('Incorrect password');
        return;
      }
    }

    if (newCert.name && newCert.issuer && newCert.date) {
      const cert: Certificate = {
        id: Date.now().toString(),
        name: newCert.name,
        issuer: newCert.issuer,
        date: newCert.date
      };
      setCertificates([...certificates, cert]);
      setNewCert({});
      setShowAddForm(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('portfolio_password');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-slate-dark text-3xl font-bold">Certifications & Achievements</h2>
        <div className="flex gap-2">
          {isAuthenticated && (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm"
            >
              Logout
            </Button>
          )}
          {isAuthenticated && (
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-accent-teal hover:bg-blue-400 text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Certificate
            </Button>
          )}
        </div>
      </div>

      <div className="divider-accent mb-12"></div>

      {/* Add Certificate Form */}
      {showAddForm && isAuthenticated && (
        <Card className="p-6 mb-8 bg-blue-50 dark:bg-slate-800 border-l-4 border-l-accent-teal">
          <h3 className="font-semibold text-slate-dark mb-4">Add New Certificate</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Certificate Name
              </label>
              <input
                type="text"
                value={newCert.name || ''}
                onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="e.g., AWS Solutions Architect"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Issuing Organization
              </label>
              <input
                type="text"
                value={newCert.issuer || ''}
                onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="e.g., Amazon Web Services"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="text"
                value={newCert.date || ''}
                onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="e.g., Expected: June 2026"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleAddCertificate}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Certificates Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id}>
            {editingId === cert.id && editForm ? (
              <Card className="p-6 border-l-4 border-l-accent-teal bg-blue-50 dark:bg-slate-800">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Certificate Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Issuer
                    </label>
                    <input
                      type="text"
                      value={editForm.issuer}
                      onChange={(e) => setEditForm({ ...editForm, issuer: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="text"
                      value={editForm.date}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSaveEdit}
                      className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingId(null)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6 shadow-elevated border-l-4 border-l-accent-teal h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 rounded-lg bg-accent-teal/10 flex-shrink-0">
                    <Award className="w-6 h-6 text-accent-teal" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-dark">{cert.name}</h3>
                    <p className="text-accent-teal font-medium text-sm">{cert.issuer}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{cert.date}</p>
                  </div>
                </div>
                {isAuthenticated && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      onClick={() => handleEdit(cert)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(cert.id)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                )}
              </Card>
            )}
          </div>
        ))}
      </div>

      {certificates.length === 0 && (
        <Card className="p-12 text-center">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No certificates yet. Add one to get started!</p>
        </Card>
      )}
    </div>
  );
};

export default Certificates;
