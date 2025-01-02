"use client";

import { useEffect, useState } from "react";
import { JsonRpcClient } from "@calimero-is-near/calimero-p2p-sdk";

const NODE_URL = "http://127.0.0.1:2428/jsonrpc";
const CONTEXT_ID = "6nwwPjNaNMFEWuB5YbtGmHf82ZNVcUKAXNTLUdrHGY1X";
const APP_ID = "G7Bybz2DESSNWQzeL9w4NfmCq1Go8yrkuW3EsSBLHbBY";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [newNoteId, setNewNoteId] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const rpcClient = new JsonRpcClient(NODE_URL, "/jsonrpc");

  const fetchNotes = async () => {
    try {
      const response = await rpcClient.query({
        applicationId: APP_ID,
        method: "entries",
        argsJson: { contextId: CONTEXT_ID },
      });
      setNotes(response.output || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async () => {
    if (!newNoteId || !newNoteContent) return;

    try {
      await rpcClient.mutate({
        applicationId: APP_ID,
        method: "add_note",
        argsJson: { note_id: newNoteId, content: newNoteContent },
      });
      setNewNoteId("");
      setNewNoteContent("");
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await rpcClient.mutate({
        applicationId: APP_ID,
        method: "delete_note",
        argsJson: { note_id: noteId },
      });
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Private Notes</h1>

      {/* Notes List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #ddd",
              marginBottom: "10px",
              borderRadius: "5px",
              background: "#f9f9f9",
            }}
          >
            <span>
              <strong>{note.id}</strong>: {note.content}
            </span>
            <button
              onClick={() => deleteNote(note.id)}
              style={{
                padding: "5px 10px",
                background: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add New Note Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          margin: "20px auto",
        }}
      >
        <input
          type="text"
          placeholder="Note ID"
          value={newNoteId}
          onChange={(e) => setNewNoteId(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <input
          type="text"
          placeholder="Note Content"
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={addNote}
          style={{
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Note
        </button>
      </div>
    </div>
  );
}
