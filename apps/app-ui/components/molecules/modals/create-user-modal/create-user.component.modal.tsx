import { LoginForm } from '@components/molecules/forms';
import UserForm from '@components/molecules/forms/user/create-user/create-user.form.component';
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from '@headlessui/react';
import { Fragment, FunctionComponent, useState } from 'react';

export const CreateUserModal: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Create New User
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
              <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
                Create New User
              </DialogTitle>
              <Description className="text-gray-600 mb-6">
                Please fill in the details below to create a new user.
              </Description>
              <UserForm />
              <div className="mt-6">
                <button
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CreateUserModal;
