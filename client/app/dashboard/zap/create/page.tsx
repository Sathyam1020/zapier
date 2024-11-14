'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import ZapCell from '@/components/ZapCell';
import React, { useState } from 'react';
import useAvailableActionsAndTriggers from '@/hooks/trigger-actions';
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";

const CreateZap = () => {
    const router = useRouter();
  const [selectedActions, setSelectedActions] = useState<{
    index: number;
    availableActionId: string;
    availableActionName: string;
    metadata: any;
  }[]>([]);

  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: string;
    name: string;
  }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"trigger" | "action">("trigger");
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(null);

  // Fetch all the triggers and actions
  const { availableActions, availableTriggers, loading, error } = useAvailableActionsAndTriggers();

  const handleTriggerClick = () => {
    setModalType("trigger");
    setIsModalOpen(true);
  };

  const handleActionClick = (index: number) => {
    setModalType("action");
    setSelectedActionIndex(index);
    setIsModalOpen(true);
  };

  const handleSelectItem = (item: { id: string; name: string; metadata?: any }) => {
    if (modalType === "trigger") {
      setSelectedTrigger({ id: item.id, name: item.name });
    } else if (modalType === "action" && selectedActionIndex !== null) {
      setSelectedActions((actions) =>
        actions.map((action) =>
          action.index === selectedActionIndex
            ? {
                ...action,
                availableActionId: item.id,
                availableActionName: item.name,
                metadata: item.metadata || {},
              }
            : action
        )
      );
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen flex-col justify-center flex items-center">
      <div className="flex justify-center w-full">
        <ZapCell
          name={selectedTrigger ? selectedTrigger.name : " Trigger "}
          index={1}
          onClick={handleTriggerClick}
        />
      </div>
      <div>
        {selectedActions.map((action, index) => (
          <ZapCell
            key={index}
            name={action.availableActionName ? action.availableActionName : " Action"}
            index={action.index}
            onClick={() => handleActionClick(action.index)}
          />
        ))}
      </div>
      <Button
        className="w-[300px] rounded-2xl font-bold text-2xl"
        onClick={() => {
          setSelectedActions((a) => [
            ...a,
            {
              index: a.length + 2,
              availableActionId: "",
              availableActionName: "",
              metadata: {},
            }
          ]);
        }}
      >
        +
      </Button>
      <Button
        className="bg-[#ff4f01] hover:bg-[#ff2b01] transition-all duration-200 text-white font-bold rounded-2xl px-6 mt-2"
        onClick={async () => {
        if (!selectedTrigger?.id) {
            return;
        }
        const response = await axios.post(`${BACKEND_URL}/api/v1/zap`, {
            "availableTriggerId": selectedTrigger.id,
            "triggerMetadata": {},
            "actions": selectedActions.map(a => ({
                availableActionId: a.availableActionId,
                actionMetadata: a.metadata
            }))
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })

        router.push("/dashboard");
        }}>
            Publish
        </Button>

      {/* Modal for selecting triggers or actions */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalType === "trigger" ? "Select a Trigger" : "Select an Action"}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              (modalType === "trigger" ? availableTriggers : availableActions).map((item: {id: string; name: string; image: string}) => (
                <div
                  key={item.id}
                  className=" flex space-x-3 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"
                  onClick={() => handleSelectItem(item)}
                >
                    <img src={item.image} className="h-[30px] w-[30px] rounded-full"/>
                    <p className="text-xl font-semibold">
                        {item.name}
                    </p>
                </div>
              ))
            )}
          </div>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateZap;
