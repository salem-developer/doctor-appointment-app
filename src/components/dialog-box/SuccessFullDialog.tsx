// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Download, Star } from "lucide-react";

// export function SuccessDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
//               <div className="text-2xl">🎉</div>
//             </div>
//           </div>
//           <DialogTitle className="text-center text-xl font-bold text-gray-900">
//             Congratulations! Your appointment is confirmed.
//           </DialogTitle>
//           <DialogDescription className="text-center text-gray-600 mt-2">
//             Your appointment has been successfully booked with Dr. Smith.
//             You can download your appointment confirmation below.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="flex flex-col space-y-3 my-6">
//           <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 cursor-pointer">
//             <Download className="w-4 h-4" />
//             DOWNLOAD CONFIRMATION
//           </Button>
//         </div>

//         <div className="text-center border-t pt-4">
//           <p className="text-sm text-gray-600 mb-3">
//             Rate your booking experience.
//           </p>
//           <Button
//             variant="ghost"
//             className="text-green-600 hover:text-green-700 hover:bg-green-50 text-sm font-medium"
//           >
//             <Star className="w-4 h-4 mr-1" />
//             RATE YOUR EXPERIENCE
//           </Button>
//         </div>

//         <DialogFooter className="sm:justify-center mt-4">
//           <DialogClose asChild>
//             <Button type="button" variant="outline" className="px-8">
//               Close
//             </Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, Download, Star } from "lucide-react";
import { Button } from "../ui/button";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  doctorName: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  onClose,
  doctorName,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-8 w-full max-w-md shadow-lg text-center">
          <CheckCircle2 className="text-green-500 w-12 h-12 mx-auto mb-4" />
          {/* <h2 className="text-xl font-bold text-gray-800 mb-2">
            Appointment Booked!
          </h2>
          <p className="text-gray-600 mb-6">Your appointment has been scheduled successfully.</p> */}
          <div className="text-center text-xl font-bold text-gray-900">
            Congratulations! Your appointment is confirmed.
          </div>
          <div className="text-center text-gray-600 mt-2">
            Your appointment has been successfully booked with {doctorName}. You
            can download your appointment confirmation below.
          </div>
          <div className="flex flex-col space-y-3 my-6">
            <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 cursor-pointer">
              <Download className="w-4 h-4" />
              DOWNLOAD CONFIRMATION
            </Button>
          </div>
          <div className="text-center border-t pt-4">
            {" "}
            <p className="text-sm text-gray-600 mb-3">
              {" "}
              Rate your booking experience{" "}
            </p>
            <Button
              variant="ghost"
              className="text-green-600 hover:text-green-700 hover:bg-green-50 text-sm font-medium"
            >
              <Star className="w-4 h-4 mr-1" />
              RATE YOUR EXPERIENCE
            </Button>
          </div>
          <Dialog.Close asChild className="mt-6">
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition cursor-pointer"
            >
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SuccessDialog;
